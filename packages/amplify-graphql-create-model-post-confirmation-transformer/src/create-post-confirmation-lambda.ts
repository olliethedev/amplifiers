import { StackManagerProvider, TransformHostProvider } from '@aws-amplify/graphql-transformer-interfaces';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import { IRole } from '@aws-cdk/aws-iam';
import { FieldMappingItem } from './directive-type';

const LogicalName = "CreatePostConfirmation"

export const createLambda = (stack: Stack, host: TransformHostProvider, role: IRole, tableName: string, fieldMappings: FieldMappingItem[]) => {

    // create lambda
    const funcLogicalId = `${ LogicalName }LambdaFunction`;
    const lambdaFunc = host.addLambdaFunction(
        funcLogicalId, // function name
        `functions/${ funcLogicalId }.zip`, // function key
        'index.handler', // function handler
        path.join(__dirname, 'assets', 'lambda.zip'),
        lambda.Runtime.NODEJS_14_X,
        undefined, // layers
        role, // execution role,
        {
            "API_USERTABLE_NAME": tableName,
            "API_FIELD_TYPE_MAP": JSON.stringify(fieldMappings),
        }, // env vars
        undefined, // lambda timeout
        stack,
    );

    role.attachInlinePolicy(
        new iam.Policy(stack, `${ LogicalName }CloudWatchLogAccess`, {
            statements: [
                new iam.PolicyStatement({
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                    effect: iam.Effect.ALLOW,
                    resources: [
                        cdk.Fn.sub(`arn:aws:logs:\${AWS::Region}:\${AWS::AccountId}:log-group:/aws/lambda/\${funcName}:log-stream:*`, {
                            funcName: lambdaFunc.functionName,
                        }),
                    ],
                }),
            ],
        }),
    );

    return lambdaFunc;
};
