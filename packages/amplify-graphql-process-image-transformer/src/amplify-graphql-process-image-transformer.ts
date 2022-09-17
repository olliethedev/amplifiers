import {
    DirectiveWrapper,
    InvalidDirectiveError,
    TransformerPluginBase,
} from '@aws-amplify/graphql-transformer-core';
import { ModelResourceIDs, ResourceConstants } from "graphql-transformer-common";
import {
    TransformerContextProvider,
} from '@aws-amplify/graphql-transformer-interfaces';
import { TransformerSchemaVisitStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces/src';
import { DirectiveNode, FieldDefinitionNode, InterfaceTypeDefinitionNode, ObjectTypeDefinitionNode } from 'graphql';
import { createEventSourceMapping, createLambda } from './create-process-image-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { DynamoDbDataSource } from '@aws-cdk/aws-appsync';
import { IConstruct, CfnCondition, Fn, CfnParameter } from '@aws-cdk/core';
import { IFunction } from '@aws-cdk/aws-lambda';
import { IRole, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { DirectiveArgs, ProcessorAction } from './directive-type';

const STACK_NAME = 'ProcessImageTransformer';

const directiveName = "processImage";



interface DirectiveObjectTypeDefinition {
    node: ObjectTypeDefinitionNode;
    fieldName: string;
    fieldParams: DirectiveArgs;
}

export class Transformer extends TransformerPluginBase {
    private directiveMap: Record<string, DirectiveObjectTypeDefinition> = {};

    constructor() {
        super(
            'amplify-graphql-process-image-transformer',
        /* GraphQL */ `
          directive @${ directiveName }(bucket:String! actions:[AWSJSON!]! ) on FIELD_DEFINITION
        `,
        );
    }

    field = (
        parent: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
        definition: FieldDefinitionNode,
        directive: DirectiveNode,
        context: TransformerSchemaVisitStepContextProvider,
    ): void => {
        validateModelDirective(parent as ObjectTypeDefinitionNode);
        validateFieldDirective(definition);
        const directiveArguments = getDirectiveArguments(directive);
        validateDirectiveArguments(directiveArguments, definition);

        this.directiveMap[definition.name.value] = {
            node: parent as ObjectTypeDefinitionNode,
            fieldName: definition.name.value,
            fieldParams: directiveArguments,
        };
    }

    generateResolvers = (context: TransformerContextProvider): void => {
        const stack = context.stackManager.createStack(STACK_NAME);
        const env = context.stackManager.getParameter(ResourceConstants.PARAMETERS.Env) as CfnParameter;

        stack.templateOptions.templateFormatVersion = '2010-09-09';
        stack.templateOptions.description = `An auto-generated nested stack for the @${ directiveName } directive.`;

        new CfnCondition(stack, ResourceConstants.CONDITIONS.HasEnvironmentParameter, {
            expression: Fn.conditionNot(Fn.conditionEquals(env, ResourceConstants.NONE)),
        });

        // lambda role
        const role = new Role(stack, `${ STACK_NAME }LambdaRole`, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        // create lambda inputs
        const fieldMappings = Object.keys(this.directiveMap).reduce((acc, modelName) => {
            const { fieldName, fieldParams, node } = this.directiveMap[modelName];
            const table = getTable(context, node);
            const ddbTable = table as Table;
            acc[ddbTable.tableArn] = { 
                fieldName, 
                args: fieldParams
            };
            return acc;
        }, {} as Record<string, { fieldName: string, args: DirectiveArgs }>);

        // create lambda function
        const lambda = createLambda(
            stack, context, role, fieldMappings
        );

        // creates event source mapping for each table
        createSourceMappings(this.directiveMap, context, lambda);
    };
}

const validateModelDirective = (object: ObjectTypeDefinitionNode): void => {
    const modelDirective = object.directives!.find((dir) => dir.name.value === 'model');
    if (!modelDirective) {
        throw new InvalidDirectiveError('The @default directive may only be added to object definitions annotated with @model.');
    }
};

const validateFieldDirective = (field: FieldDefinitionNode): void => {
    if (field.type.kind === 'NonNullType' && (field as any).type.type.name.value !== 'AWSURL') {
        throw new InvalidDirectiveError(`@${ directiveName } can only be used on a field of type AWSURL.`);
    }
    if (field.type.kind === 'NamedType' && field.type.name.value !== 'AWSURL') {
        throw new InvalidDirectiveError(`@${ directiveName } can only be used on a field of type AWSURL.`);
    }
};

const getDirectiveArguments = (directive: DirectiveNode): DirectiveArgs => {
    const directiveWrapped = new DirectiveWrapper(directive);
    return directiveWrapped.getArguments<DirectiveArgs>({
        bucket: "",
        actions: [
            {
                type: "resize",
                name: "small",
                width: 100,
                height: 100,
            } as ProcessorAction
        ]
    });
}

const validateDirectiveArguments = (directiveArguments: DirectiveArgs, field: FieldDefinitionNode): void => {
    if (directiveArguments.actions.length === 0) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to be an array with at least one item.`);
    directiveArguments.actions.forEach((action, index) => {
        if (!action.type || action.type.length === 0) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to have a type property.`);
        if (!["resize"].includes(action.type)) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to have a type property with a value of "resize".`);
        if (!action.name || action.name.length === 0) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to have a name property.`);
        if (!action.width || isNaN(action.width)) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to have a width property that is an integer.`);
        if (!action.height || isNaN(action.height)) throw new InvalidDirectiveError(`@${ directiveName } requires an actions argument to have a height property.`);
    });
}

const createSourceMappings = (directiveMap: Record<string, DirectiveObjectTypeDefinition>, context: TransformerContextProvider, lambda: IFunction): void => {
    const stack = context.stackManager.getStack(STACK_NAME);
    for (const modelName of Object.keys(directiveMap)) {
        const def = directiveMap[modelName];
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