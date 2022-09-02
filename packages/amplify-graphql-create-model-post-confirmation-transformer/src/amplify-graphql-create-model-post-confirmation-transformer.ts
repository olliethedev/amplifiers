import {
    TransformerPluginBase,
  } from '@aws-amplify/graphql-transformer-core';
  import {
    TransformerContextProvider,
  } from '@aws-amplify/graphql-transformer-interfaces';
import { TransformerSchemaVisitStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces/src';
import { DirectiveNode, ObjectTypeDefinitionNode } from 'graphql';
import { createLambda } from './create-post-confirmation-lambda';
  
  const directiveName = "createModelPostConfirmation";

  export class Transformer extends TransformerPluginBase {
    constructor() {
      super(
        'amplify-graphql-create-model-post-confirmation-transformer',
        /* GraphQL */ `
          directive @${ directiveName } on OBJECT
        `,
      );
    }
    object = (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerSchemaVisitStepContextProvider) => {
        
      };
    generateResolvers = (context: TransformerContextProvider): void => {
        // const { Env } = ResourceConstants.PARAMETERS;
        // const { HasEnvironmentParameter } = ResourceConstants.CONDITIONS;
    
        // const stack = context.stackManager.createStack(STACK_NAME);
    
        // creates region mapping for stack
        // setMappings(stack);
    
        // const envParam = context.stackManager.getParameter(Env) as CfnParameter;
        // eslint-disable-next-line no-new
        // new CfnCondition(stack, HasEnvironmentParameter, {
        //   expression: Fn.conditionNot(Fn.conditionEquals(envParam, ResourceConstants.NONE)),
        // });
    
        // stack.templateOptions.description = 'An auto-generated nested stack for algolia.';
        // stack.templateOptions.templateFormatVersion = '2010-09-09';
    
        // // creates parameters map
        // const defaultFieldParams = this.searchableObjectTypeDefinitions.reduce((acc, { fieldNameRaw, directiveArguments }) => {
        //   return { [fieldNameRaw]: directiveArguments.fields, ...acc }
        // }, {} as Record<string, FieldList>);
        // const defaultSettingsParams = this.searchableObjectTypeDefinitions.reduce((acc, { fieldNameRaw, directiveArguments }) => {
        //   return { [fieldNameRaw]: directiveArguments.settings, ...acc }
        // }, {} as Record<string, string>);
        // const parameterMap = createParametersInStack(context.stackManager.rootStack, defaultFieldParams, defaultSettingsParams);
    
    
        // streaming lambda role
        // const lambdaRole = createLambdaRole(context, stack, parameterMap);
    
        // creates algolia lambda
        createLambda(
            context.api.host, context.stackManager
        );
        console.log(`Created lambda...`);
    
        // // creates event source mapping for each table
        // createSourceMappings(this.searchableObjectTypeDefinitions, context, lambda, parameterMap);
      };
  }