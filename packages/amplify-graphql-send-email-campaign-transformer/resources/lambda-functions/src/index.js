import { SESClient, ListIdentitiesCommand, SendEmailCommand } from "@aws-sdk/client-ses";
import { getEmailRecipients } from './api-helper.js';
const sesClient = new SESClient({ region: process.env.REGION || "us-east-1" }); 

const MAX_SES_BATCH_SIZE = 50;


export const handler = async (event) => {
  console.time("handler execution time"); // Start timer
  console.log("event: ", event);
  console.log("env: ", process.env);
  console.info(JSON.stringify(event, null, 4));

  // Define your email parameters
  const sender = 'no-reply@amplifyui.com'; // Replace with your verified sender email
  const subject = 'Your Subject Here';
  const bodyText = 'The body of your email.';

  // An array of recipient email addresses
  const allRecipients = await getEmailRecipients(["newsletter", "premium"]);

  const recipientBatch = [];

  // Split recipients into batches of 50

  while (allRecipients.length > 0) {
    recipientBatch.push(allRecipients.splice(0, MAX_SES_BATCH_SIZE));
  }

  // Function to send emails to a batch of recipients
  const sendBatch = async (recipients) => {
    const params = {
      Source: sender,
      Destination: { ToAddresses: recipients },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: bodyText } }
      }
    };

    try {
      const command = new SendEmailCommand(params);
      const response = await sesClient.send(command);
      console.log("Email sent:", JSON.stringify(response));
      return response;
    } catch (err) {
      console.error("Error sending email:", err);
      throw err;
    }
  };

  // Send out emails in batches
  for (const batch of recipientBatch) {
    try {
      await sendBatch(batch);
    } catch (error) {
      console.error(error);
    }
  }

  console.timeEnd("handler execution time"); // End timer
  return { statusCode: 200, body: JSON.stringify('Emails sent successfully.') };
};

