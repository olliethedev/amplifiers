const mockedAWS = jest.mock("aws-sdk", () => {
  const mockDynamoDB = {
    putItem: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const mockDynamoDBConstructor = jest.fn(() => mockDynamoDB);
  return {
    DynamoDB: mockDynamoDBConstructor,
  };
});

const postConfEvent = {
  version: "1",
  region: "us-east-1",
  userPoolId: "us-east-1_FQpF02rH8",
  userName: "3aafe7bc-2c0d-3333-ac98-ea9d8f00c25b",
  callerContext: {
    awsSdkVersion: "aws-sdk-unknown-unknown",
    clientId: "2p33thmsh3qj1rrtbadq9nj9cv",
  },
  triggerSource: "PostConfirmation_ConfirmSignUp",
  request: {
    userAttributes: {
      sub: "3aafe7bc-2c0d-3333-ac98-ea9d8f00c25b",
      email_verified: "true",
      "cognito:user_status": "CONFIRMED",
      "cognito:email_alias": "some-email@gmail.com",
      email: "some-email@gmail.com",
      "custom:age": "30",
    },
  },
  response: {},
};

describe("lambda-functions", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  test("handles post confirmation event", async () => {
    //mock env variables
    process.env.API_USERTABLE_NAME = "User-hu56y6uccvfhlb4zwtxj3uqdia-dev";
    process.env.API_FIELD_TYPE_MAP = JSON.stringify([
      {
        age: { type: "Int", source: "custom:age" },
        email: { type: "String", source: "email" },
      },
    ]);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(postConfEvent);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).toHaveBeenCalledWith(
      expect.objectContaining({
        Item: {
          id: { S: "3aafe7bc-2c0d-3333-ac98-ea9d8f00c25b" },
          __typename: { S: "User" },
          _lastChangedAt: { N: expect.any(String) },
          _version: { N: "1" },
          createdAt: { S: expect.any(String) },
          updatedAt: { S: expect.any(String) },
          email: { S: "some-email@gmail.com" },
          age: { N: "30" },
        },
      })
    );
  });
});
