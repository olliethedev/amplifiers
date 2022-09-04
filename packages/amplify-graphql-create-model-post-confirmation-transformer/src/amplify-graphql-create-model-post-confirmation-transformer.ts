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
import { createLambda } from './create-post-confirmation-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { DynamoDbDataSource } from '@aws-cdk/aws-appsync';
import { IConstruct } from '@aws-cdk/core';
import { IFunction } from '@aws-cdk/aws-lambda';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';

const STACK_NAME = 'CreatePostConfirmation';

const directiveName = "createModelPostConfirmation";

interface DirectiveArgs {
    cognitoField: String | null
    modelField: String | null
  }

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
          directive @${ directiveName }(fieldMap: [FieldMap]) on OBJECT
          input FieldMap {
            cognitoField: String!
            modelField: String!
          }
        `,
        );

        this.directiveObjectTypeDefinitions = [];
    }
    object = (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerSchemaVisitStepContextProvider): void => {
        
        validateModelDirective(definition);
        const directiveArguments = getDirectiveArguments(directive);
        //todo: validate directive arguments, to make sure they set valid mappings from cognito to model fields, and the fields exist and of right type
        // console.log(JSON.stringify(definition, null, 2));
        console.log(JSON.stringify(directiveArguments, null, 2));
        this.directiveObjectTypeDefinitions.push({
            node: definition,
            fieldName: definition.name.value,
            //todo: add field directive arguments
        });

    };
    generateResolvers = (context: TransformerContextProvider): void => {

        const stack = context.stackManager.createStack(STACK_NAME);
        console.log('directiveObjectTypeDefinitions', this.directiveObjectTypeDefinitions);
        const tableNames = this.directiveObjectTypeDefinitions.map(def => (getTable(context, def.node) as Table).tableName);
        console.log({tableNames});

        // streaming lambda role
        const role = new Role(stack, `${ STACK_NAME }LambdaRole`, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        // creates algolia lambda
        const lambda = createLambda(
            stack, context.api.host, role, tableNames?.[0] ?? "" //todo: pass fieldMapppings to lambda
        );

        // // creates event source mapping for each table
        createSourceMappings(this.directiveObjectTypeDefinitions, context, lambda);
    };

}

const getDirectiveArguments = (directive: DirectiveNode): DirectiveArgs => {
    const directiveWrapped = new DirectiveWrapper(directive);
    return directiveWrapped.getArguments({
        cognitoField: null,
        modelField: null
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

const getTable = (context: TransformerContextProvider, definition: ObjectTypeDefinitionNode): IConstruct => {
    const ddbDataSource = context.dataSources.get(definition) as DynamoDbDataSource;
    const tableName = ModelResourceIDs.ModelTableResourceID(definition.name.value);
    const table = ddbDataSource.ds.stack.node.findChild(tableName);
    return table;
};