const mockedAWS = jest.mock("aws-sdk", () => {
  const mockSES = {
    sendEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  const mockConverter = {
    unmarshall: require("aws-sdk/clients/dynamodb").Converter.unmarshall,
  };
  const mockSESConstructor = jest.fn(() => mockSES);
  return {
    SES: mockSESConstructor,
    DynamoDB: {
      Converter: mockConverter,
    },
    throwOnSendEmail: () => {
      mockSES.promise.mockImplementationOnce(() => {
        throw new Error("Error saving to DB");
      });
    },
  };
});

const EVENT = {
  Records: [
    {
      eventID: "48ad2d2c16da4f587a3668bcc0a3705b",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1663012721,
        Keys: {
          id: {
            S: "c751a281-e2d8-4cb7-ba47-07c5ebcce1ac",
          },
        },
        NewImage: {
          createdAt: {
            S: "2022-09-12T19:58:41.330Z",
          },
          __typename: {
            S: "Todo",
          },
          name: {
            S: "ollie",
          },
          description: {
            S: "hello world",
          },
          id: {
            S: "c751a281-e2d8-4cb7-ba47-07c5ebcce1ac",
          },
          email: {
            S: "cool-cat@cats.com",
          },
          updatedAt: {
            S: "2022-09-12T19:58:41.330Z",
          },
        },
        SequenceNumber: "3933500000000081057326266",
        SizeBytes: 211,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:446581856886:table/Todo-maox6ksn6jgxdhwcqn4ucc37oi-dev/stream/2022-09-11T21:58:04.921",
    },
    {
      eventID: "762930b05058ab79b6e94e7fd50896a5",
      eventName: "MODIFY",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1663031143,
        Keys: {
          id: {
            S: "17a48e9b-12d5-4fb9-8a14-408880e2b999",
          },
        },
        NewImage: {
          createdAt: {
            S: "2022-09-13T01:04:45.932Z",
          },
          __typename: {
            S: "Todo",
          },
          name: {
            S: "Allie",
          },
          description: {
            S: "Hello world!",
          },
          id: {
            S: "17a48e9b-12d5-4fb9-8a14-408880e2b999",
          },
          email: {
            S: "cool-cat@cats.com",
          },
          updatedAt: {
            S: "2022-09-13T01:05:42.985Z",
          },
        },
        OldImage: {
          createdAt: {
            S: "2022-09-13T01:04:45.932Z",
          },
          __typename: {
            S: "Todo",
          },
          name: {
            S: "Allie",
          },
          description: {
            S: "Hello world!",
          },
          id: {
            S: "17a48e9b-12d5-4fb9-8a14-408880e2b999",
          },
          email: {
            S: "cool-cat@cats.com",
          },
          updatedAt: {
            S: "2022-09-13T01:05:23.732Z",
          },
        },
        SequenceNumber: "4812400000000037578384325",
        SizeBytes: 386,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:446581856886:table/Todo-maox6ksn6jgxdhwcqn4ucc37oi-dev/stream/2022-09-11T21:58:04.921",
    },
    {
      eventID: "a10cb1f3fb9a7dc35f6b52489c7fd776",
      eventName: "REMOVE",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1663031143,
        Keys: {
          id: {
            S: "17a48e9b-12d5-4fb9-8a14-408880e2b999",
          },
        },
        OldImage: {
          createdAt: {
            S: "2022-09-13T01:04:45.932Z",
          },
          __typename: {
            S: "Todo",
          },
          name: {
            S: "Allie",
          },
          description: {
            S: "Hello world!",
          },
          id: {
            S: "17a48e9b-12d5-4fb9-8a14-408880e2b999",
          },
          email: {
            S: "cool-cat@cats.com",
          },
          updatedAt: {
            S: "2022-09-13T01:05:42.985Z",
          },
        },
        SequenceNumber: "4812500000000037578384326",
        SizeBytes: 212,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:446581856886:table/Todo-maox6ksn6jgxdhwcqn4ucc37oi-dev/stream/2022-09-11T21:58:04.921",
    },
  ],
};

const fieldMap = {
  "arn:aws:dynamodb:us-east-1:446581856886:table/Todo-maox6ksn6jgxdhwcqn4ucc37oi-dev":
    {
      trigger: "INSERT",
      template: {
        subject: "Welcome to Amplify",
        bodyHtml:
          "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>",
        bodyText: "Hello, {{name}}! Welcome to Amplify!\\nMessage here",
        sender: "no-reply@example.io",
        recipient: "{{email}}",
      },
    },
};

const expectedSESParams = {
  Destination: { ToAddresses: ["cool-cat@cats.com"] },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "<body><h1>Hello, ollie! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>",
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello, ollie! Welcome to Amplify!\\nMessage here",
      },
    },
    Subject: { Charset: "UTF-8", Data: "Welcome to Amplify" },
  },
  Source: "no-reply@example.io",
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
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ses = new (require("aws-sdk").SES)();
    expect(ses.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining(expectedSESParams)
    );
  });

  test("gracefully handles ses send error", async () => {
    require("aws-sdk").throwOnSendEmail();
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler(EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ses = new (require("aws-sdk").SES)();
    expect(ses.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining(expectedSESParams)
    );
  });
  test("gracefully skips if unknown event source", async () => {
    require("aws-sdk").throwOnSendEmail();
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with post confirmation event
    const result = await lambda.handler({
      Records: [{eventSourceARN:
        "arn:aws:dynamodb:us-east-1:446581856886:table/UnknownTable-maox6ksn6jgxdhwcqn4ucc37oi-dev/stream/2022-09-11T21:58:04.921",}],
    });
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var ses = new (require("aws-sdk").SES)();
    expect(ses.sendEmail).not.toHaveBeenCalled();
  });
});
