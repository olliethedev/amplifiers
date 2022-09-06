import { TransformHostProvider } from '@aws-amplify/graphql-transformer-interfaces';
import {Runtime} from '@aws-cdk/aws-lambda';
import {IRole, Policy, PolicyStatement, Effect} from '@aws-cdk/aws-iam';
import {Stack, Fn}  from '@aws-cdk/core';
import * as path from 'path';
import { FieldMappingItem } from './directive-type';

const LogicalName = "CreatePostConfirmation"

export const createLambda = (stack: Stack, host: TransformHostProvider, role: IRole, fieldMappings: {[tableName:string]:FieldMappingItem[]}) => {
    console.log("creating");
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
            "API_FIELD_TYPE_MAP": JSON.stringify(fieldMappings),
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
    

    return lambdaFunc;
};
