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
import { FieldMappingItem } from './directive-type';

const STACK_NAME = 'CreateModelTransformer';

const directiveName = "createModel";

type DirectiveArgs = {
    fieldMap: [{
        cognitoField: String | null
        modelField: String | null
    }];
    trigger: "postConfirmation";
}

interface DirectiveObjectTypeDefinition {
    node: ObjectTypeDefinitionNode;
    fieldName: string;
    fieldParams: DirectiveArgs;
}

export class Transformer extends TransformerPluginBase {
    directiveObjectTypeDefinitions: DirectiveObjectTypeDefinition[];

    constructor() {
        super(
            'amplify-graphql-create-model-transformer',
        /* GraphQL */ `
          directive @${ directiveName }(trigger:String="postConfirmation", fieldMap: [FieldMap]) on OBJECT
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
            const tableName = (getTable(context, def.node) as Table).tableName;
            const fieldMapping = def.fieldParams.fieldMap.map(fieldMap => {
                const item: FieldMappingItem = {
                    [fieldMap.modelField as string]: {
                        type: 'string',
                        source: fieldMap.cognitoField as string,
                    },
                }
                return item;
            });
            acc[tableName] = fieldMapping;
            return acc;
        }, {} as { [tableName: string]: FieldMappingItem[] });

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
    return directiveWrapped.getArguments({
        trigger: "postConfirmation",
        fieldMap: [{
            cognitoField: null,
            modelField: null
        }]
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
    const isFieldMapValid = directiveArguments.fieldMap.every(fieldMap => {
        let hasFieldInModel = object.fields!.some(field => field.name.value === fieldMap.modelField);
        if(!hasFieldInModel) {
            console.warn(`Field ${ fieldMap.modelField } does not exist in ${ object.name.value }`);
        }
        return fieldMap.cognitoField && fieldMap.modelField;
    });
    if (!isFieldMapValid) {
        throw new InvalidDirectiveError(
            `Types annotated with @${ directiveName } must have fieldMap[] with both cognitoField and modelField provided.`
        );
    }
    const isTriggerValid = directiveArguments.trigger === "postConfirmation";
    if (!isTriggerValid) {
        throw new InvalidDirectiveError(
            `Types annotated with @${ directiveName } only supports postConfirmation as trigger.`
        );
    }
}

const createSourceMappings = (typeDefinitions: DirectiveObjectTypeDefinition[], context: TransformerContextProvider, lambda: IFunction): void => {
    for (const def of typeDefinitions) {
        const table = getTable(context, def.node);
        const ddbTable = table as Table;
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