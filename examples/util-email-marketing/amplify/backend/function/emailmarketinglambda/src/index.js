import {
  SESClient,
  ListIdentitiesCommand,
  SendEmailCommand,
} from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: process.env.REGION || "us-east-1" });
const MAX_SES_BATCH_SIZE = 50;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  if (!event || !event.arguments) {
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid event format"),
    };
  }

  const { sender, recipients, subject, body, bodyText } = event.arguments;

  let sendCount = 0;

  if (!sender || !recipients || !subject || !body || !bodyText) {
    return {
      statusCode: 400,
      body: JSON.stringify("Missing required fields in event arguments"),
    };
  }

  if (
    !Array.isArray(recipients) ||
    recipients.some((email) => typeof email !== "string")
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify("Invalid recipients format"),
    };
  }

  const recipientBatch = [];

  // Split recipients into batches of 50

  while (recipients.length > 0) {
    recipientBatch.push(recipients.splice(0, MAX_SES_BATCH_SIZE));
  }

  // Function to send emails to a batch of recipients
  const sendBatch = async (emails) => {
    const params = {
      Source: sender,
      Destination: { BccAddresses: emails },
      Message: {
        Subject: { Data: subject },
        Body: { Html: { Data: body }, Text: { Data: bodyText } },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await sesClient.send(command);
      sendCount += emails.length;
      console.log("Email sent:", JSON.stringify(response));
      return response;
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }
  };

  // Send out emails in batches
  console.time("send batches execution time"); // Start timer
  for (const batch of recipientBatch) {
    try {
      await sendBatch(batch);
    } catch (error) {
      console.error(error);
    }
  }
  console.timeEnd("send batches execution time"); // End timer

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(`${sendCount} emails sent`),
  };
};

export { handler };