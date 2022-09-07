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
import { createLambda } from './create-post-confirmation-lambda';
describe("create-post-confirmation-lambda", () => {
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
}
);