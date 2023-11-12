// var aws = require("aws-sdk");
// var ses = new aws.SES({ region: process.env.AWS_REGION });



exports.handler = async (event, context) => {
  console.log("event: ", event);
  console.log("env: ", process.env);
  console.info(JSON.stringify(event, null, 4));
  
  return event;
};

