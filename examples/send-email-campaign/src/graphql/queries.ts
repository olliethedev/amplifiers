/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEmailCampaign = /* GraphQL */ `query GetEmailCampaign($id: ID!) {
  getEmailCampaign(id: $id) {
    id
    name
    emailSubject
    emailContent
    emailSender
    emailLists
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmailCampaignQueryVariables,
  APITypes.GetEmailCampaignQuery
>;
export const listEmailCampaigns = /* GraphQL */ `query ListEmailCampaigns(
  $filter: ModelEmailCampaignFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      emailSubject
      emailContent
      emailSender
      emailLists
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
` as GeneratedQuery<
  APITypes.ListEmailCampaignsQueryVariables,
  APITypes.ListEmailCampaignsQuery
>;
export const syncEmailCampaigns = /* GraphQL */ `query SyncEmailCampaigns(
  $filter: ModelEmailCampaignFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailCampaigns(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      emailSubject
      emailContent
      emailSender
      emailLists
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
` as GeneratedQuery<
  APITypes.SyncEmailCampaignsQueryVariables,
  APITypes.SyncEmailCampaignsQuery
>;
export const getEmailList = /* GraphQL */ `query GetEmailList($name: ID!) {
  getEmailList(name: $name) {
    name
    emailRecipients {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmailListQueryVariables,
  APITypes.GetEmailListQuery
>;
export const listEmailLists = /* GraphQL */ `query ListEmailLists(
  $name: ID
  $filter: ModelEmailListFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEmailLists(
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      name
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
` as GeneratedQuery<
  APITypes.ListEmailListsQueryVariables,
  APITypes.ListEmailListsQuery
>;
export const syncEmailLists = /* GraphQL */ `query SyncEmailLists(
  $filter: ModelEmailListFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailLists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      name
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
` as GeneratedQuery<
  APITypes.SyncEmailListsQueryVariables,
  APITypes.SyncEmailListsQuery
>;
export const getEmailRecipient = /* GraphQL */ `query GetEmailRecipient($email: AWSEmail!) {
  getEmailRecipient(email: $email) {
    email
    emailLists {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmailRecipientQueryVariables,
  APITypes.GetEmailRecipientQuery
>;
export const listEmailRecipients = /* GraphQL */ `query ListEmailRecipients(
  $email: AWSEmail
  $filter: ModelEmailRecipientFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listEmailRecipients(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      email
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
` as GeneratedQuery<
  APITypes.ListEmailRecipientsQueryVariables,
  APITypes.ListEmailRecipientsQuery
>;
export const syncEmailRecipients = /* GraphQL */ `query SyncEmailRecipients(
  $filter: ModelEmailRecipientFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailRecipients(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      email
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
` as GeneratedQuery<
  APITypes.SyncEmailRecipientsQueryVariables,
  APITypes.SyncEmailRecipientsQuery
>;
export const getEmailRecipientLists = /* GraphQL */ `query GetEmailRecipientLists($id: ID!) {
  getEmailRecipientLists(id: $id) {
    id
    emailListName
    emailRecipientEmail
    emailList {
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    emailRecipient {
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetEmailRecipientListsQueryVariables,
  APITypes.GetEmailRecipientListsQuery
>;
export const listEmailRecipientLists = /* GraphQL */ `query ListEmailRecipientLists(
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailRecipientLists(
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
` as GeneratedQuery<
  APITypes.ListEmailRecipientListsQueryVariables,
  APITypes.ListEmailRecipientListsQuery
>;
export const syncEmailRecipientLists = /* GraphQL */ `query SyncEmailRecipientLists(
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailRecipientLists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
` as GeneratedQuery<
  APITypes.SyncEmailRecipientListsQueryVariables,
  APITypes.SyncEmailRecipientListsQuery
>;
export const emailRecipientListsByEmailListName = /* GraphQL */ `query EmailRecipientListsByEmailListName(
  $emailListName: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientListsByEmailListName(
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
` as GeneratedQuery<
  APITypes.EmailRecipientListsByEmailListNameQueryVariables,
  APITypes.EmailRecipientListsByEmailListNameQuery
>;
export const emailRecipientListsByEmailRecipientEmail = /* GraphQL */ `query EmailRecipientListsByEmailRecipientEmail(
  $emailRecipientEmail: AWSEmail!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientListsByEmailRecipientEmail(
    emailRecipientEmail: $emailRecipientEmail
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
` as GeneratedQuery<
  APITypes.EmailRecipientListsByEmailRecipientEmailQueryVariables,
  APITypes.EmailRecipientListsByEmailRecipientEmailQuery
>;
