// const mockedIAM = jest.mock("@aws-cdk/aws-iam", () => {
//     __esModule: true;
//     return {
//         Policy: jest.fn((one:any, two:any, three:any)=>{}),
//         PolicyStatement: jest.fn(()=>{}),
//         ServicePrincipal: jest.fn(()=>{}),
//         IRole: jest.fn(),
//     };
// });
// const mockedCore = jest.mock("@aws-cdk/core", () => {
//     const mockCore = {
//         Fn: {
//             sub: jest.fn(),
//         },
//     };
//     return {
//         Core: jest.fn(() => mockCore),
//     };
// });

import { Stack } from '@aws-cdk/core';
import { createLambda, createEventSourceMapping } from './create-send-email-campaign-lambda';
describe("create-send-email-lambda", () => {
    beforeEach(() => {
        jest.resetModules();
      });
    test("should create lambda", () => {
        const lambda = createLambda(
            new Stack(),
            { addLambdaFunction: () => ({ functionName: "name" }) } as any,
            { attachInlinePolicy: () => { } } as any,
            {},
        );
        expect(lambda).toBeTruthy();
    });
    test("should create event source mapping", () => {
        const mapping = createEventSourceMapping(
            new Stack(),
            "name",
            { functionName: "name" } as any,
            "arn",
        );
        expect(mapping).toBeTruthy();
    });
});