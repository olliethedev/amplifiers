var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

/** @type {string | undefined} */
const tableName = process.env.API_USERTABLE_NAME;
/** @type {[{[sourceField:string]: { type: string, source: string }}] | undefined} */
const tableFieldTypeMap = process.env.API_FIELD_TYPE_MAP; // { email: { type: "String", source: "email" }};

exports.handler = async (event, context) => {
  console.info(JSON.stringify(event, null, 4));
  if (!tableName) {
    console.warn("No table name provided");
    return event;
  }
  if (!tableFieldTypeMap) {
    console.warn("No table field type map provided");
    return event;
  }
  if (event.triggerSource !== "PostConfirmation_ConfirmSignUp") {
    console.warn("Trigger source is not PostConfirmation_ConfirmSignUp");
    return event;
  }
  if (
    !event.request ||
    !event.request.userAttributes ||
    !event.request.userAttributes.sub
  ) {
    console.warn("No user attributes provided");
    return event;
  }
  const date = new Date();
  /** @type {[{[destinationField:string]: { type: string, source: string }}] | undefined} */
  const parsedTableFieldTypeMap = JSON.parse(tableFieldTypeMap);
  const fieldArray = convertFieldMapToFields(parsedTableFieldTypeMap, event.request.userAttributes);
  const params = {
    Item: {
      // Items below that begin with __ are needed for DataStore. When you create an object in
      // DataStore for the first time, those fields are created automatically. If you don't have it when
      // you go update an item, it will throw and error.
      // note:  `event.userName` is same as sub only if singup uses email and not username
      id: { S: event.request.userAttributes.sub }, // This is the Sub ID from AuthCognitoIdentityProvider, useful to query current user
      __typename: { S: "User" },
      _lastChangedAt: { N: date.valueOf().toString() }, // timestamp
      _version: { N: "1" }, // Every time this object gets modified, this version will increase, therefore we begin with 1
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
      ...fieldArray
    },
    TableName: tableName,
  };
  try {
    await ddb.putItem(params).promise();
  } catch (err) {
    console.warn("Error saving to DB", { err, params });
  }
  return event;
};

function convertFieldMapToFields(parsedTableFieldTypeMap, userAttributes){
  const accumulator = {};
  parsedTableFieldTypeMap.forEach((mapping) => //for each row mapping (destinationField => {type, source})
    Object.keys(mapping).reduce((acc, destination) => {
      const { type, source } = mapping[destination];
      acc[destination] = {
        [mapScalarTypeToDynamoType(type)]: userAttributes[source],
      };
      return acc;
    }, accumulator)
  )
  return accumulator;
}

function mapScalarTypeToDynamoType(type) {
  switch (type) {
    case "String":
      return "S";
    case "Int":
      return "N";
    case "Float":
      return "N";
    case "Boolean":
      return "BOOL";
    default:
      return "S";
  }
}
