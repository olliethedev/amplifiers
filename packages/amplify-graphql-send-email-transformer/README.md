# amplify-graphql-send-email-transformer #

## Description ##

This AWS Amplify directive allows you to send emails from your GraphQL API. It uses AWS SES service to send emails. Once a database INSERT, MODIFY, REMOVE operation is performed, the template is populated with data from the mutation and email is sent out to the recipient.

## @sendEmail ##

### Definition ###

```graphql
directive @sendEmail(template:Template, trigger:String="INSERT") on OBJECT
  input Template {
    subject: String!
    bodyText: String!
    bodyHtml: String!
    sender: String!
    recipient: String!
  }
```

## Installation ##

```bash
npm install --save @amplifiers/amplify-graphql-send-email-transformer
```

## Import ##
`/amplify/backend/api/<API_NAME>/transform.conf.json`
```json
{
  "transformers": [
    "@amplifiers/amplify-graphql-send-email-transformer"
  ]
}
```

## Usage ##
Append the `@sendEmail` directive to a model in your GraphQL schema. The `@sendEmail` directive takes a `trigger` string and `template` input object as arguments.

`trigger` field specifies the BD event type and can be one of the following values: `INSERT`, `MODIFY`, `REMOVE`

`subject` contains the subject of the email.

`bodyHtml` contains the HTML body of the email.

`bodyText` contains the text body of the email.

The `sender` is the email you have configured with SES to send out the emails.

The `recipient` is the email address of the recipient. 

You can use the `{{}}` syntax to populate your fields with data from the database event.

### Example: ###
```graphql
type User
  @model
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1 style='color:#ff00ff'>Hello, {{name}}! Welcome to Amplify!</h1></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!\nMessage here"
      sender: "no-reply@example.com",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
}
```


### Setup AWS SES ###
If it is your first time using SES you will be in a sandbox where you have multiple [restrictions](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) and only allowed to send from and to whitelisted email addresses. You can whitelist your own email address by following the instructions:
1) Go to SES Service in AWS Console and Click “Email Addresses” under Identity Management. Remember the AWS Region where you are registering the email.
2) Click on “Verify a new email address” and add the email address to which emails will be sent. Remember email addresses are case sensitive.
3) The above action will send a verification mail from AWS to the added email address to confirm Id and accept emails. Once the user of that email address verifies, you can check “Verification Status” turns to “verified”.
4) You can “Send a Test Email” to verify the same and check the stats of sent emails in the SES console.

![alt text](https://github.com/olliethedev/amplifiers/raw/master/read-me-email-sign-up.png)

## Development and Contributions ##
Contributions are more than welcome! Please feel free to open an issue or a pull request.
Developer docs are [here](https://github.com/olliethedev/amplifiers)

## License ##
[MIT License](https://github.com/olliethedev/amplifiers/blob/master/LICENSE)