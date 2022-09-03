import {
    InvalidDirectiveError,
    TransformerPluginBase,
} from '@aws-amplify/graphql-transformer-core';
import {
    TransformerContext,
} from 'graphql-transformer-core';
import { ModelResourceIDs, ResourceConstants } from "graphql-transformer-common";
import {
    TransformerContextProvider,
} from '@aws-amplify/graphql-transformer-interfaces';
import { TransformerSchemaVisitStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces/src';
import { DirectiveNode, ObjectTypeDefinitionNode } from 'graphql';
import { createLambda } from './create-post-confirmation-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { DynamoDbDataSource } from '@aws-cdk/aws-appsync';
import { CfnParameter, IConstruct } from '@aws-cdk/core';
import { IFunction } from '@aws-cdk/aws-lambda';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';

const STACK_NAME = 'CreatePostConfirmation';

const directiveName = "createModelPostConfirmation";

interface DirectiveObjectTypeDefinition {
    node: ObjectTypeDefinitionNode;
    fieldName: string;
}

export class Transformer extends TransformerPluginBase {
    directiveObjectTypeDefinitions: DirectiveObjectTypeDefinition[];

    constructor() {
        super(
            'amplify-graphql-create-model-post-confirmation-transformer',
        /* GraphQL */ `
          directive @${ directiveName } on OBJECT
        `,
        );

        this.directiveObjectTypeDefinitions = [];
    }
    object = (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerSchemaVisitStepContextProvider): void => {
        validateModelDirective(definition);

        this.directiveObjectTypeDefinitions.push({
            node: definition,
            fieldName: definition.name.value,
        });

    };
    generateResolvers = (context: TransformerContextProvider): void => {

        const stack = context.stackManager.createStack(STACK_NAME);

        const tableNames = this.directiveObjectTypeDefinitions.map(def => (getTable(context, def.node) as Table).tableName);
        console.log(tableNames);

        // streaming lambda role
        const role = new Role(stack, `${ STACK_NAME }LambdaRole`, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        // creates algolia lambda
        const lambda = createLambda(
            stack, context.api.host, role, tableNames?.[0] ?? ""
        );

        // // creates event source mapping for each table
        createSourceMappings(this.directiveObjectTypeDefinitions, context, lambda);
    };

}

const getTable = (context: TransformerContextProvider, definition: ObjectTypeDefinitionNode): IConstruct => {
    const ddbDataSource = context.dataSources.get(definition) as DynamoDbDataSource;
    const tableName = ModelResourceIDs.ModelTableResourceID(definition.name.value);
    const table = ddbDataSource.ds.stack.node.findChild(tableName);
    return table;
};

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

const createSourceMappings = (typeDefinitions: DirectiveObjectTypeDefinition[], context: TransformerContextProvider, lambda: IFunction): void => {
    for (const def of typeDefinitions) {
        const table = getTable(context, def.node);
        const ddbTable = table as Table;
        if (!ddbTable) {
            throw new Error('Failed to find ddb table for searchable');
        }
        if (lambda.role) {
            ddbTable.grantReadWriteData(lambda.role);
        }
    }
}