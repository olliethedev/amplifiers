import { EventSourceMapping, IFunction, Runtime, StartingPosition } from '@aws-cdk/aws-lambda';
import { IRole, Policy, PolicyStatement, Effect, CfnAccessKey } from '@aws-cdk/aws-iam';
import { Stack, Fn, Construct, Duration } from '@aws-cdk/core';
import { ResourceConstants } from 'graphql-transformer-common';
import * as path from 'path';
import { DirectiveArgs } from './directive-type';
import { TransformerContextProvider } from '@aws-amplify/graphql-transformer-interfaces/src';

const LogicalName = "ProcessImageTransformer"
const LAMBDA_TIMEOUT = 15;

export const createLambda = (stack: Stack, context: TransformerContextProvider, role: IRole, fieldMappings: Record<string, { fieldName: string, args: DirectiveArgs }>) => { //fieldMappings: {[sourceArn:string]:DirectiveArgs}
    const host = context.api.host;
    // create lambda
    const funcLogicalId = `${ LogicalName }LambdaFunction`;
    const lambdaFunc = host.addLambdaFunction(
        funcLogicalId, // function name
        `functions/${ funcLogicalId }.zip`, // function key
        'index.handler', // function handler
        path.join(__dirname, 'assets', 'lambda.zip'),
        Runtime.NODEJS_14_X,
        undefined, // layers
        role, // execution role,
        {
            "API_FIELD_DATA_MAP": JSON.stringify(fieldMappings),
            "LAMBDA_TIMEOUT": LAMBDA_TIMEOUT.toString(),
        }, // env vars
        Duration.seconds(LAMBDA_TIMEOUT + 1), // lambda timeout
        stack,
    );
    
    // add lambda permissions
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
        new Policy(stack, `${ LogicalName }S3Access`, {
            statements: [
                new PolicyStatement({
                    actions: [
                        's3:PutObject',
                        's3:GetObject',
                        's3:ListBucket',
                        's3:DeleteObject',
                        's3:PutObjectAcl',
                    ],
                    effect: Effect.ALLOW,
                    resources: [
                        ...Object.values(fieldMappings)
                        .map(({ args }) =>  `arn:aws:s3:::${ args.bucket }/*`),
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
    return new EventSourceMapping(stack, `ProcessImage${ type }LambdaMapping`, {
        eventSourceArn: tableStreamArn,
        target,
        batchSize: 100,
        maxBatchingWindow: Duration.seconds(1),
        enabled: true,
        startingPosition: StartingPosition.LATEST,
        retryAttempts: 2,
    });
};


