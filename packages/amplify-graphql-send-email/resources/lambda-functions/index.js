var aws = require("aws-sdk");

exports.handler = async (event, context) => {
  console.info(JSON.stringify(event, null, 4));
  
  return event;
};
