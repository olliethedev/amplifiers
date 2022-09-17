const mockedAWS = jest.mock("aws-sdk", () => {
  const mockS3 = {
    getObject: jest.fn().mockReturnThis(),
    putObject: jest.fn().mockReturnThis(),
    promise: jest.fn(() => ({ Body: "" })),
  };
  const mockConverter = {
    unmarshall: require("aws-sdk/clients/dynamodb").Converter.unmarshall,
  };
  const mockS3Constructor = jest.fn(() => mockS3);
  return {
    S3: mockS3Constructor,
    DynamoDB: {
      Converter: mockConverter,
    },
    throwOnGetObject: () => {
      mockS3.promise.mockImplementationOnce(() => {
        throw new Error("Error getting object from S3");
      });
    },
  };
});

const mockedMetadat = jest.fn(() => ({ format: "png" }));
const mockToBuffer = jest.fn(() => Promise.resolve("buffer"));

const mockedSharp = jest.mock("sharp", () => {
  const mockSharp = {
    resize: jest.fn().mockReturnThis(),
    toFormat: jest.fn().mockReturnThis(),
    toBuffer: mockToBuffer,
    metadata: mockedMetadat
  };
  const mockSharpConstructor = jest.fn((buffer) => mockSharp);
  return mockSharpConstructor;
});

const EVENT = {
  Records: [
    {
      eventID: "755482ae802c49b353ebf0544c7d06c8",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1663299683,
        Keys: {
          id: {
            S: "612dfd71-3d70-4e40-8c21-181f54c96fa3",
          },
        },
        NewImage: {
          createdAt: {
            S: "2022-09-16T03:41:23.215Z",
          },
          image: {
            S: "https://appimagestoreage113252-dev.s3.us-east-1.amazonaws.com/public/Twitter-logo.png",
          },
          __typename: {
            S: "Product",
          },
          name: {
            S: "Real Deal",
          },
          description: {
            S: "Some Text Here",
          },
          id: {
            S: "612dfd71-3d70-4e40-8c21-181f54c96fa3",
          },
          updatedAt: {
            S: "2022-09-16T03:41:23.215Z",
          },
        },
        SequenceNumber: "6463400000000021265357930",
        SizeBytes: 287,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:446581856886:table/Product-x5efajhysnb3hk7g64rzb2bnna-dev/stream/2022-09-14T15:35:57.607",
    },
  ],
};

const fieldMap = {
  "arn:aws:dynamodb:us-east-1:446581856886:table/Product-x5efajhysnb3hk7g64rzb2bnna-dev":
    {
      fieldName: "image",
      args: {
        bucket: "appimagestoreage113252-dev",
        actions: [
          { type: "resize", name: "thumbnail", width: 100, height: 100 },
          { type: "resize", name: "medium", width: 500, height: 500 },
        ],
      },
    },
};

describe("lambda-functions", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, LAMBDA_TIMEOUT: 1 };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("handles image event happy path", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const result = await lambda.handler(EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).toHaveBeenNthCalledWith(1, 
        expect.objectContaining({
            ContentType: "application/json",
        })
    );
    expect(s3.putObject).toHaveBeenNthCalledWith(2, 
        expect.objectContaining({
            ContentType: "image/png",
        })
    );
    expect(s3.putObject).toHaveBeenNthCalledWith(3, 
        expect.objectContaining({
            ContentType: "image/png",
        })
    );
    expect(s3.putObject).toHaveBeenNthCalledWith(4, 
        expect.objectContaining({
            ContentType: "application/json",
        })
    );
  });

  test("handles status upload", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const result = await lambda.handler(EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).toHaveBeenCalledWith(
        expect.objectContaining({
            ContentType: "application/json",
        })
    );
  });

  test("gracefully handles invalid url", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.NewImage.image.S = "https://google.com";
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalled();
  });

  test("gracefully handles invalid url", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.NewImage.image.S = "";
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalled();
  });

  test("gracefully handles invalid action type", async () => {
    //mock env variables
    const BAD_FIELD_MAP = { ...fieldMap };
    BAD_FIELD_MAP['arn:aws:dynamodb:us-east-1:446581856886:table/Product-x5efajhysnb3hk7g64rzb2bnna-dev'].args.actions[0].type = "invalid";
    process.env.API_FIELD_DATA_MAP = JSON.stringify(BAD_FIELD_MAP)
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const result = await lambda.handler(EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).toHaveBeenCalledTimes(3);
  });

  test("skips image event if no field changed", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.OldImage = BAD_EVENT.Records[0].dynamodb.NewImage;
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalled();
  });

  test("skips image event if field is null", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.NewImage = null;
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalled();
  });

  test("gracefully handles invalid image extension", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    mockedMetadat.mockReturnValueOnce({ format: "foo" });
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.NewImage.image.S = "https://appimagestoreage113252-dev.s3.us-east-1.amazonaws.com/public/Twitter-logo.foo";
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalledWith({
        ContentType: "image/png",
    });
  });

  test("gracefully handles timeout", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    mockToBuffer.mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
            //never resolve
        });
    });
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].dynamodb.NewImage.image.S = "https://appimagestoreage113252-dev.s3.us-east-1.amazonaws.com/public/Twitter-logo.foo";
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalledWith({
        ContentType: "image/png",
    });
  });

  test("gracefully handles unknown stream source", async () => {
    //mock env variables
    process.env.API_FIELD_DATA_MAP = JSON.stringify(fieldMap);
    mockedMetadat.mockReturnValueOnce({ format: "foo" });
    //load lambda function
    const lambda = require("./index");
    //call with image event
    const BAD_EVENT = JSON.parse(JSON.stringify(EVENT));
    BAD_EVENT.Records[0].eventSourceARN = "arn:aws:dynamodb:us-east-1:446581856886:table/Product-foobar-dev";
    const result = await lambda.handler(BAD_EVENT);
    expect(result).toBeDefined();
    // check if dynamoDB was called
    var s3 = new (require("aws-sdk").S3)();
    expect(s3.putObject).not.toHaveBeenCalledWith({
        ContentType: "image/png",
    });
  });
});
