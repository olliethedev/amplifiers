import { GraphQLAPIProvider, TransformerContextProvider } from '@aws-amplify/graphql-transformer-interfaces';
import {EventSourceMapping, IFunction, Runtime, StartingPosition} from 'aws-cdk-lib/aws-lambda';
import {
    IRole, Policy, PolicyStatement, Effect, Role, ServicePrincipal,
  } from 'aws-cdk-lib/aws-iam';
import { CfnParameter, Fn, Stack, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { SendEmailCampaignDirectiveArgs } from './directive-type';

const LogicalName = "SendEmailCampaignTransformer"

export const createLambda = (stack: Stack, apiGraphql: GraphQLAPIProvider, role: IRole, fieldMappings: {[sourceArn:string]:SendEmailCampaignDirectiveArgs}) => {
    // create lambda
    const funcLogicalId = `${ LogicalName }LambdaFunction`;
    const lambdaFunc = apiGraphql.host.addLambdaFunction(
        funcLogicalId, // function name
        `functions/${ funcLogicalId }.zip`, // function key
        'index.handler', // function handler
        path.join(__dirname, 'assets', 'lambda.zip'),
        Runtime.NODEJS_14_X,
        undefined, // layers
        role, // execution role,
        {
            "API_FIELD_DATA_MAP": JSON.stringify(fieldMappings),
        }, // env vars
        undefined, // lambda timeout
        stack,
    );

    role.attachInlinePolicy(
        new Policy(stack, `${ LogicalName }CloudWatchLogAccess`, {
            statements: [
                new PolicyStatement({
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                    effect: Effect.ALLOW,
                    resources: [
                        Fn.sub(`arn:aws:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/\${funcName}:log-stream:*`, {
                            funcName: lambdaFunc.functionName,
                        }),
                    ],
                }),
            ],
        }),
    );

    role.attachInlinePolicy(
        new Policy(stack, `${ LogicalName }SESAccess`, {
            statements: [
                new PolicyStatement({
                    actions: [
                        'ses:SendEmail',
                        'ses:SendRawEmail',
                        'ses:SendTemplatedEmail',
                    ],
                    effect: Effect.ALLOW,
                    resources: [
                        Fn.sub(`arn:aws:ses:\${AWS::Region}:\${AWS::AccountId}:identity/*`, {
                            funcName: lambdaFunc.functionName,
                        }),
                    ],
                }),
            ],
        }),
    );
    

    return lambdaFunc;
};

export const createEventSourceMapping = (
    stack: Construct,
    type: string,
    target: IFunction,
    tableStreamArn: string,
  ): EventSourceMapping => {
    return new EventSourceMapping(stack, `SendEmailCampaign${type}LambdaMapping`, {
      eventSourceArn: tableStreamArn,
      target,
      batchSize: 100,
      maxBatchingWindow: Duration.seconds(1),
      enabled: true,
      startingPosition: StartingPosition.LATEST,
    });
  };
