import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL;
const AWS_REGION = process.env.REGION || "us-east-1";

const MAX_PAGE_SIZE = 10; //TODO: Change this to 1000 after testing

const emailRecipientsEmailListsByEmailListName = /* GraphQL */ `
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

export const getEmailRecipients = async (emailListNames) => {
  console.log({ emailListNames });

  const allItems = [];

  for (const listName of emailListNames) {
    let nextToken;
    let firstRun = true;

    do {
      const variables = {
        emailListName: listName,
        limit: MAX_PAGE_SIZE,
        nextToken,
      };
      const { statusCode, body } = await execute(
        emailRecipientsEmailListsByEmailListName,
        variables
      );

      if (statusCode !== 200) {
        console.error({ statusCode, body: JSON.stringify(body, null, 4) });
      } else {
        allItems.push(
          ...body.data.emailRecipientsEmailListsByEmailListName.items.map(
            ({ emailRecipientEmail }) => emailRecipientEmail
          )
        );

        nextToken =
          body.data.emailRecipientsEmailListsByEmailListName.nextToken;
      }

      firstRun = false;
    } while (nextToken || firstRun);
  }

  return deduplicate(allItems);
};

const execute = async (query, variables) => {
  console.log({ query, variables });
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  //   const credentials = {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     sessionToken: process.env.AWS_SESSION_TOKEN,
  //   };
  //   console.log({ credentials });
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  console.log({ signed });
  const request = new Request(GRAPHQL_ENDPOINT, signed);

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
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

const deduplicate = (array) => [...new Set(array)];
