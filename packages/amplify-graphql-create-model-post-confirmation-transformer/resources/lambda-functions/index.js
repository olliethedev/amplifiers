var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();
const tableName = process.env.API_USERTABLE_NAME ?? "";
console.log({tableName})

// type UserPoolEvent = APIGatewayProxyEvent & { userName: string, request: { userAttributes: { sub: string, email: string } } };
// export const handler = async (event: UserPoolEvent, context: Context): Promise<any | undefined> => {
exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 4))
  let date = new Date();
  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        // Items below that begin with __ are needed for DataStore. When you create an object in
        // DataStore for the first time, those fields are created automatically. If you don't have it when
        // you go update an item, it will throw and error.
        id: { S: event.request.userAttributes.sub }, // This is the Sub ID from AuthCognitoIdentityProvider, useful to query current user
        __typename: { S: "User" },
        _lastChangedAt: { N: date.valueOf().toString() }, // timestamp
        _version: { N: "1" }, // Every time this object gets modified, this version will increase, therefore we begin with 1
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        username: { S: event.userName }, // same as sub if singup only uses email and no username
        email: { S: event.request.userAttributes.email },
      },
      TableName: tableName,
    };

    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
  } else {
    console.log("Error: Nothing was written to DynamoDB");
  }
  return event;
};