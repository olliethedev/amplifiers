import { DirectiveWrapper, generateGetArgumentsInput, MappingTemplate, TransformerPluginBase } from '@aws-amplify/graphql-transformer-core';
import { TransformerContextProvider, TransformerSchemaVisitStepContextProvider } from '@aws-amplify/graphql-transformer-interfaces';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AuthorizationType } from 'aws-cdk-lib/aws-appsync';
import * as cdk from 'aws-cdk-lib';
import { IRole, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { obj, str, ref, printBlock, compoundExpression, qref, raw, iff, Expression } from 'graphql-mapping-template';
import { FunctionResourceIDs, ResolverResourceIDs, ResourceConstants } from 'graphql-transformer-common';
import { DirectiveNode, ObjectTypeDefinitionNode, InterfaceTypeDefinitionNode, FieldDefinitionNode } from 'graphql';
import { createLambda } from './create-send-email-campaign-lambda';
import { CfnRole } from 'aws-cdk-lib/aws-iam';

type FunctionDirectiveConfiguration = {
  senderEmail: string;
  resolverTypeName: string;
  resolverFieldName: string;
};

const SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK = 'SendEmailTransformer';
const directiveDefinition = /* GraphQL */ `
  directive @sendEmailCampaign(senderEmail: String!) repeatable on FIELD_DEFINITION
`;

export class Transformer extends TransformerPluginBase {
  private resolverGroups: Map<FieldDefinitionNode, FunctionDirectiveConfiguration[]> = new Map();

  constructor(private readonly functionNameMap?: Record<string, lambda.IFunction>) {
    super('amplify-send-email-campaign-transformer', directiveDefinition);
  }

  field = (
    parent: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
    definition: FieldDefinitionNode,
    directive: DirectiveNode,
    acc: TransformerSchemaVisitStepContextProvider,
  ): void => {
    const directiveWrapped = new DirectiveWrapper(directive);
    const args = directiveWrapped.getArguments(
      {
        resolverTypeName: parent.name.value,
        resolverFieldName: definition.name.value,
      } as FunctionDirectiveConfiguration,
      generateGetArgumentsInput(acc.transformParameters),
    );
    let resolver = this.resolverGroups.get(definition);

    if (resolver === undefined) {
      resolver = [];
      this.resolverGroups.set(definition, resolver);
    }

    resolver.push(args);
  };

  generateResolvers = (context: TransformerContextProvider): void => {
    if (this.resolverGroups.size === 0) {
      return;
    }

    const stack: cdk.Stack = context.stackManager.createStack(SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK);
    const createdResources = new Map<string, any>();
    const env = context.synthParameters.amplifyEnvironmentName;

    stack.templateOptions.templateFormatVersion = '2010-09-09';
    stack.templateOptions.description = 'An auto-generated nested stack for the @function directive.';

    new cdk.CfnCondition(stack, ResourceConstants.CONDITIONS.HasEnvironmentParameter, {
      expression: cdk.Fn.conditionNot(cdk.Fn.conditionEquals(env, ResourceConstants.NONE)),
    });

    // lambda role
    const role = new Role(stack, `${ SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK }LambdaRole`, {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    // create lambda inputs
    // const fieldMappings = this.directiveObjectTypeDefinitions.reduce((acc, def) => {
    //     const table = getTable(context, def.node);
    //     const ddbTable = table as Table;
    //     acc[ddbTable.tableArn] = def.fieldParams;
    //     return acc;
    // }, {} as { [key: string]: DirectiveArgs });
    const fieldMappings = {};
    const parameterMap = new Map<string, string>();

    // create lambda function
    const lambda = createLambda(
        stack, context.api, role, parameterMap, fieldMappings,
    );

    console.log("got lambda ");

    this.resolverGroups.forEach((resolverFns) => {
        console.log("resolverFns");
      resolverFns.forEach((config) => {
        console.log("config");
        // Create data sources that register Lambdas and IAM roles.
        const dataSourceId = FunctionResourceIDs.FunctionDataSourceID(lambda.functionName);
        console.log("config1");
        if (!createdResources.has(dataSourceId)) {
            console.log("config2");
          const referencedFunction: lambda.IFunction = lambda;
          const dataSourceScope = context.stackManager.getScopeFor(dataSourceId, SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK);
          const dataSource = context.api.host.addLambdaDataSource(dataSourceId, referencedFunction, {}, dataSourceScope);
          createdResources.set(dataSourceId, dataSource);
          console.log("config3");
        }

        // Create AppSync functions.
        const functionId = FunctionResourceIDs.FunctionAppSyncFunctionConfigurationID(lambda.functionName);
        let func = createdResources.get(functionId);
        console.log("config4");

        if (func === undefined) {
            console.log("config5");
          const funcScope = context.stackManager.getScopeFor(functionId, SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK);
          console.log("config6");
          func = context.api.host.addAppSyncFunction(
            functionId,
            MappingTemplate.s3MappingTemplateFromString(
              printBlock(`Invoke AWS Lambda data source: ${dataSourceId}`)(
                obj({
                  version: str('2018-05-29'),
                  operation: str('Invoke'),
                  payload: obj({
                    typeName: ref('util.toJson($ctx.stash.get("typeName"))'),
                    fieldName: ref('util.toJson($ctx.stash.get("fieldName"))'),
                    arguments: ref('util.toJson($ctx.arguments)'),
                    identity: ref('util.toJson($ctx.identity)'),
                    source: ref('util.toJson($ctx.source)'),
                    request: ref('util.toJson($ctx.request)'),
                    prev: ref('util.toJson($ctx.prev)'),
                  }),
                }),
              ),
              `${functionId}.req.vtl`,
            ),
            MappingTemplate.s3MappingTemplateFromString(
              printBlock('Handle error or return result')(
                compoundExpression([
                  iff(ref('ctx.error'), raw('$util.error($ctx.error.message, $ctx.error.type)')),
                  raw('$util.toJson($ctx.result)'),
                ]),
              ),
              `${functionId}.res.vtl`,
            ),
            dataSourceId,
            funcScope,
          );
          console.log("config7");

          createdResources.set(functionId, func);
          console.log("config8");
        }

        // Create the GraphQL resolvers.
        const resolverId = ResolverResourceIDs.ResolverResourceID(config.resolverTypeName, config.resolverFieldName);
        let resolver = createdResources.get(resolverId);

        console.log("config9");

        const requestTemplate: Array<Expression> = [
          qref(`$ctx.stash.put("typeName", "${config.resolverTypeName}")`),
          qref(`$ctx.stash.put("fieldName", "${config.resolverFieldName}")`),
        ];
        console.log("config10");
        const authModes = [context.authConfig.defaultAuthentication, ...(context.authConfig.additionalAuthenticationProviders || [])].map(
          (mode) => mode?.authenticationType,
        );
        console.log("config11");
        if (authModes.includes(AuthorizationType.IAM)) {
            console.log("config12");
          const authRole = context.synthParameters.authenticatedUserRoleName;
          const unauthRole = context.synthParameters.unauthenticatedUserRoleName;
          const account = cdk.Stack.of(context.stackManager.scope).account;
          requestTemplate.push(
            qref(`$ctx.stash.put("authRole", "arn:aws:sts::${account}:assumed-role/${authRole}/CognitoIdentityCredentials")`),
            qref(`$ctx.stash.put("unauthRole", "arn:aws:sts::${account}:assumed-role/${unauthRole}/CognitoIdentityCredentials")`),
          );
          console.log("config13");
        }
        requestTemplate.push(obj({}));

        if (resolver === undefined) {
            console.log("config14");
          // TODO: update function to use resolver manager.
          const resolverScope = context.stackManager.getScopeFor(resolverId, SEND_EMAIL_CAMPAIGN_DIRECTIVE_STACK);
          resolver = context.api.host.addResolver(
            config.resolverTypeName,
            config.resolverFieldName,
            MappingTemplate.inlineTemplateFromString(printBlock('Stash resolver specific context.')(compoundExpression(requestTemplate))),
            MappingTemplate.s3MappingTemplateFromString(
              '$util.toJson($ctx.prev.result)',
              `${config.resolverTypeName}.${config.resolverFieldName}.res.vtl`,
            ),
            resolverId,
            undefined,
            [],
            resolverScope,
          );
          createdResources.set(resolverId, resolver);
          console.log("config15");
        }

        resolver.pipelineConfig.functions.push(func.functionId);
      });
    });
  };
}

const lambdaArnResource = (env: string, name: string, region?: string, accountId?: string): string => {
  const substitutions: { [key: string]: string } = {};
  // eslint-disable-next-line no-template-curly-in-string
  if (name.includes('${env}')) {
    substitutions.env = env;
  }
  return cdk.Fn.conditionIf(
    ResourceConstants.CONDITIONS.HasEnvironmentParameter,
    cdk.Fn.sub(lambdaArnKey(name, region, accountId), substitutions),
    cdk.Fn.sub(lambdaArnKey(name.replace(/(-\${env})/, ''), region, accountId)),
  ).toString();
};

const lambdaArnKey = (name: string, region?: string, accountId?: string): string => {
  // eslint-disable-next-line no-template-curly-in-string
  return `arn:aws:lambda:${region ? region : '${AWS::Region}'}:${accountId ? accountId : '${AWS::AccountId}'}:function:${name}`;
};