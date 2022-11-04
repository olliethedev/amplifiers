const mockedAWS = jest.mock("aws-sdk", () => {
  const mockDynamoDB = {
    putItem: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const mockDynamoDBConstructor = jest.fn(() => mockDynamoDB);
  return {
    DynamoDB: mockDynamoDBConstructor,
    throwOnPutItem: ()=>{
        mockDynamoDB.promise.mockImplementationOnce(() => {
            throw new Error("Error saving to DB");
        });
    }
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
      "custom:isAdmin": "true",
      "custom:fee": "2.2",
      "custom:website": "https://www.google.com",
    },
  },
  response: {},
};

const fieldMap = {["User-hu56y6uccvfhlb4zwtxj3uqdia-dev"]:[
    {
      id: { type: "String", source: "sub" },
      age: { type: "Int", source: "custom:age" },
      email: { type: "String", source: "email" },
      userName: { type: "String", source: "userName" },
      isAdmin: { type: "Boolean", source: "custom:isAdmin" },
      fee: { type: "Float", source: "custom:fee" },
      website: { type: "AWSURL", source: "custom:website" },
    },
  ]}

  const expectedDBParams = {
    Item: {
      id: { S: "3aafe7bc-2c0d-3333-ac98-ea9d8f00c25b" },
      __typename: { S: "User" },
      _lastChangedAt: { N: expect.any(String) },
      _version: { N: "1" },
      createdAt: { S: expect.any(String) },
      updatedAt: { S: expect.any(String) },
      email: { S: "some-email@gmail.com" },
      userName: { S: "3aafe7bc-2c0d-3333-ac98-ea9d8f00c25b" },
      age: { N: "30" },
      isAdmin: { BOOL: "true" },
      fee: { N: "2.2" },
        website: { S: "https://www.google.com" },
    },
  }

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
    process.env.API_FIELD_TYPE_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(postConfEvent);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).toHaveBeenCalledWith(
      expect.objectContaining(expectedDBParams)
    );
  });

  test("does not handle post confirmation event without field map", async () => {
    //mock env variables
    process.env.API_FIELD_TYPE_MAP = undefined;
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(postConfEvent);
    expect(result).toBe(postConfEvent);
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).not.toHaveBeenCalled();
  });

  test("does not handle post confirmation event from wrong trigger", async () => {
    //mock env variables
    process.env.API_FIELD_TYPE_MAP = JSON.stringify(fieldMap);
    //mock event
    const eventFromWrongTrigger = {...postConfEvent, ...{triggerSource: "some_unknown_source"}}
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(eventFromWrongTrigger);
    expect(result).toBe(eventFromWrongTrigger);
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).not.toHaveBeenCalled();
  });

  test("does not handle post confirmation event from wrong trigger", async () => {
    //mock env variables
    process.env.API_FIELD_TYPE_MAP = JSON.stringify(fieldMap);
    //mock event
    const eventWithNoAtributes = {...postConfEvent, ...{request: undefined}}
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(eventWithNoAtributes);
    expect(result).toBe(eventWithNoAtributes);
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).not.toHaveBeenCalled();
  });
  test("gracefully handles db write error", async()=>{
    require("aws-sdk").throwOnPutItem();
    //mock env variables
    process.env.API_FIELD_TYPE_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(postConfEvent);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ddb = new (require("aws-sdk").DynamoDB)();
    expect(ddb.putItem).toHaveBeenCalledWith(
      expect.objectContaining(expectedDBParams)
    );
  })
});
