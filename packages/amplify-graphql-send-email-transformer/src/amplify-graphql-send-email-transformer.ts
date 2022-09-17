import {
    DirectiveWrapper,
    InvalidDirectiveError,
    TransformerPluginBase,
} from '@aws-amplify/graphql-transformer-core';
import { ModelResourceIDs } from "graphql-transformer-common";
import {
    TransformerContextProvider,
} from '@aws-amplify/graphql-transformer-interfaces';
import { TransformerSchemaVisitStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces/src';
import { DirectiveNode, ObjectTypeDefinitionNode } from 'graphql';
import { createEventSourceMapping, createLambda } from './create-send-email-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { DynamoDbDataSource } from '@aws-cdk/aws-appsync';
import { IConstruct } from '@aws-cdk/core';
import { IFunction } from '@aws-cdk/aws-lambda';
import { IRole, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { DirectiveArgs } from './directive-type';

const STACK_NAME = 'SendEmailTransformer';

const directiveName = "sendEmail";



interface DirectiveObjectTypeDefinition {
    node: ObjectTypeDefinitionNode;
    fieldName: string;
    fieldParams: DirectiveArgs;
}

export class Transformer extends TransformerPluginBase {
    directiveObjectTypeDefinitions: DirectiveObjectTypeDefinition[];

    constructor() {
        super(
            'amplify-graphql-send-email-transformer',
        /* GraphQL */ `
          directive @${ directiveName }(template:Template, trigger:String="INSERT") on OBJECT
          input Template {
            subject: String!
            bodyText: String!
            bodyHtml: String!
            sender: String!
            recipient: String!
          }
        `,
        );

        this.directiveObjectTypeDefinitions = [];
    }

    object = (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerSchemaVisitStepContextProvider): void => {

        validateModelDirective(definition);
        const directiveArguments = getDirectiveArguments(directive);
        validateDirectiveArguments(directiveArguments, definition);

        this.directiveObjectTypeDefinitions.push({
            node: definition,
            fieldName: definition.name.value,
            fieldParams: directiveArguments,
        });
    };

    generateResolvers = (context: TransformerContextProvider): void => {
        const stack = context.stackManager.createStack(STACK_NAME);

        // lambda role
        const role = new Role(stack, `${ STACK_NAME }LambdaRole`, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        // create lambda inputs
        const fieldMappings = this.directiveObjectTypeDefinitions.reduce((acc, def) => {
            const table = getTable(context, def.node);
            const ddbTable = table as Table;
            acc[ddbTable.tableArn] = def.fieldParams;
            return acc;
        }, {} as { [key: string]: DirectiveArgs });

        // create lambda function
        const lambda = createLambda(
            stack, context.api.host, role, fieldMappings
        );

        // // creates event source mapping for each table
        createSourceMappings(this.directiveObjectTypeDefinitions, context, lambda);
    };
}

const getDirectiveArguments = (directive: DirectiveNode): DirectiveArgs => {
    const directiveWrapped = new DirectiveWrapper(directive);
    return directiveWrapped.getArguments<DirectiveArgs>({
        trigger: "INSERT",
        template: {
            subject: "",
            bodyText: "",
            bodyHtml: "",
            sender: "",
            recipient: "",
        },
    }) as (DirectiveArgs);
}

const validateModelDirective = (object: ObjectTypeDefinitionNode): void => {
    const modelDirective = object.directives!.find(
        (dir) => dir.name.value === "model"
    );
    if (!modelDirective) {
        throw new InvalidDirectiveError(
            `Types annotated with @${ directiveName } must also be annotated with @model.`
        );
    }
}

const validateDirectiveArguments = (directiveArguments: DirectiveArgs, object: ObjectTypeDefinitionNode): void => {
    const isTriggerValid = ["INSERT", "MODIFY", "REMOVE"].includes(directiveArguments.trigger);
    if (!isTriggerValid) {
        throw new InvalidDirectiveError(
            `Types annotated with @${ directiveName } only supports "INSERT", "MODIFY", "REMOVE" as triggers.`
        );
    }
}

const createSourceMappings = (typeDefinitions: DirectiveObjectTypeDefinition[], context: TransformerContextProvider, lambda: IFunction): void => {
    const stack = context.stackManager.getStack(STACK_NAME);
    for (const def of typeDefinitions) {
        const type = def.node.name.value;
        const indexName = context.resourceHelper.getModelNameMapping(type);
        const table = getTable(context, def.node);
        const ddbTable = table as Table;

        ddbTable.grantStreamRead(lambda.role as IRole);

        createEventSourceMapping(stack, indexName, lambda, ddbTable.tableStreamArn as string);
    }
}

const getTable = (context: TransformerContextProvider, definition: ObjectTypeDefinitionNode): IConstruct => {
    const ddbDataSource = context.dataSources.get(definition) as DynamoDbDataSource;
    const tableName = ModelResourceIDs.ModelTableResourceID(definition.name.value);
    const table = ddbDataSource.ds.stack.node.findChild(tableName);
    return table;
};