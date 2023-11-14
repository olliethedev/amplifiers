import {
    DirectiveWrapper,
    InvalidDirectiveError,
    TransformerPluginBase,
} from '@aws-amplify/graphql-transformer-core';
import {
    TransformerContextProvider,
    TransformerSchemaVisitStepContextProvider,
    TransformerTransformSchemaStepContextProvider,
  } from '@aws-amplify/graphql-transformer-interfaces';
import { ModelResourceIDs, ResourceConstants } from "graphql-transformer-common";
import { DirectiveNode, ObjectTypeDefinitionNode } from 'graphql';
import { createEventSourceMapping, createLambda } from './create-send-email-campaign-lambda';
import { 
    DynamoDbDataSource, 
    LambdaDataSource, 
    CfnResolver, 
    CfnDataSource 
  } from 'aws-cdk-lib/aws-appsync';
  import { IConstruct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { IRole, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { SendEmailCampaignDirectiveArgs } from './directive-type';
import { CfnOutput, CfnParameter, Fn, Stack } from 'aws-cdk-lib';


const STACK_NAME = 'SendEmailCampaignTransformer';

const directiveName = "sendEmailCampaign";



interface DirectiveObjectTypeDefinition {
    node: ObjectTypeDefinitionNode;
    fieldName: string;
    fieldParams: SendEmailCampaignDirectiveArgs;
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
        
        const parameterMap = 
        new Map<string, string>([[
            "GRAPHQL_URL",
            getGraphQlApiUrl(context)
        ]]);

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
        }, {} as { [key: string]: SendEmailCampaignDirectiveArgs });

        // create lambda function
        const lambda = createLambda(
            stack, context.api, role, parameterMap, fieldMappings
        );

        // // creates event source mapping for each table
        createSourceMappings(this.directiveObjectTypeDefinitions, context, lambda);
    };
}

const getDirectiveArguments = (directive: DirectiveNode): SendEmailCampaignDirectiveArgs => {
    const directiveWrapped = new DirectiveWrapper(directive);
    return directiveWrapped.getArguments({
        trigger: "INSERT",
        template: {
            subject: "",
            bodyText: "",
            bodyHtml: "",
            sender: "",
            recipient: "",
        },
    }) as (SendEmailCampaignDirectiveArgs);
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

const validateDirectiveArguments = (directiveArguments: SendEmailCampaignDirectiveArgs, object: ObjectTypeDefinitionNode): void => {
    // const isTriggerValid = ["INSERT", "MODIFY", "REMOVE"].includes(directiveArguments.trigger);
    // if (!isTriggerValid) {
    //     throw new InvalidDirectiveError(
    //         `Types annotated with @${ directiveName } only supports "INSERT", "MODIFY", "REMOVE" as triggers.`
    //     );
    // }
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

  const getGraphQlApiUrl = (context: TransformerContextProvider): string => {
    const stack = context.stackManager.getStackFor(context.api.name);

    const output = stack.node.findChild("GraphQLAPIEndpointOutput");
    return (output as CfnOutput).value;
};
