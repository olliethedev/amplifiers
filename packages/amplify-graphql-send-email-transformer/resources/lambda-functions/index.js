var aws = require("aws-sdk");
var ses = new aws.SES({ region: process.env.AWS_REGION });

/** @type {{ [sourceArn:string]: { trigger: string; template: { subject: string;bodyHtml: string;bodyText: string;sender: string;recipient: string;} } | undefined} */
const tableDataMap = process.env.API_FIELD_DATA_MAP; 

exports.handler = async (event, context) => {
  console.log("event: ", event);
  console.log("env: ", process.env);
  console.info(JSON.stringify(event, null, 4));
  try {
    const parsedTableDataMap = JSON.parse(tableDataMap);
    for(const Record of event.Records){
      const tableEventSource = Record.eventSourceARN.split("/stream/")[0]; //[1] is timestamp
      const tableData = parsedTableDataMap[tableEventSource];
      if(tableData){
        const trigger = tableData.trigger;
        if(trigger === Record.eventName){
          const template = tableData.template;
          const unmarshalledImage = aws.DynamoDB.Converter.unmarshall(
            Record.dynamodb.NewImage
          );
          const message = {
            Destination: {
              ToAddresses: [replaceTemplateValues(template.recipient, unmarshalledImage)]
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: replaceTemplateValues(template.bodyHtml, unmarshalledImage)
                },
                Text: {
                  Charset: "UTF-8",
                  Data: replaceTemplateValues(template.bodyText, unmarshalledImage)
                }
              },
              Subject: {
                Charset: "UTF-8",
                Data: replaceTemplateValues(template.subject, unmarshalledImage)
              }
            },
            Source: replaceTemplateValues(template.sender, unmarshalledImage)
          };
          await ses.sendEmail(message).promise();
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return event;
};

function replaceTemplateValues(template, data){
  return template.replace(/{{([^}]+)}}/g, function(match, key) {
    return data[key];
  });
}
