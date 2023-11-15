/* Amplify Params - DO NOT EDIT
	API_SENDEMAILCAMPAIGN_GRAPHQLAPIENDPOINTOUTPUT
	API_SENDEMAILCAMPAIGN_GRAPHQLAPIIDOUTPUT
	API_SENDEMAILCAMPAIGN_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_SENDEMAILCAMPAIGN_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const query = /* GraphQL */ `
  query EmailRecipientsEmailListsByEmailListName(
    $emailListName: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEmailRecipientsEmailListsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    emailRecipientsEmailListsByEmailListName(
      emailListName: $emailListName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        emailListName
        emailRecipientEmail
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log("env: ", process.env);
  console.info(JSON.stringify(event, null, 4));

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const credentials = await defaultProvider()();
  console.log({ credentials });

  const signer = new SignatureV4({
    credentials,
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables:{"emailListName":"premium","limit":10} }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  console.log({ signed });
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(body)
  };
};