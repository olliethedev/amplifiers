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
    draft
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
      draft
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
      draft
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
    emailCampaigns {
      nextToken
      startedAt
      __typename
    }
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
export const getEmailListsEmailCampaigns = /* GraphQL */ `query GetEmailListsEmailCampaigns($id: ID!) {
  getEmailListsEmailCampaigns(id: $id) {
    id
    emailCampaignId
    emailListName
    emailCampaign {
      id
      name
      emailSubject
      emailContent
      emailSender
      draft
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    emailList {
      name
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
  APITypes.GetEmailListsEmailCampaignsQueryVariables,
  APITypes.GetEmailListsEmailCampaignsQuery
>;
export const listEmailListsEmailCampaigns = /* GraphQL */ `query ListEmailListsEmailCampaigns(
  $filter: ModelEmailListsEmailCampaignsFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailListsEmailCampaigns(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListName
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
  APITypes.ListEmailListsEmailCampaignsQueryVariables,
  APITypes.ListEmailListsEmailCampaignsQuery
>;
export const syncEmailListsEmailCampaigns = /* GraphQL */ `query SyncEmailListsEmailCampaigns(
  $filter: ModelEmailListsEmailCampaignsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailListsEmailCampaigns(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      emailCampaignId
      emailListName
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
  APITypes.SyncEmailListsEmailCampaignsQueryVariables,
  APITypes.SyncEmailListsEmailCampaignsQuery
>;
export const emailListsEmailCampaignsByEmailCampaignId = /* GraphQL */ `query EmailListsEmailCampaignsByEmailCampaignId(
  $emailCampaignId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailListsEmailCampaignsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailListsEmailCampaignsByEmailCampaignId(
    emailCampaignId: $emailCampaignId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListName
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
  APITypes.EmailListsEmailCampaignsByEmailCampaignIdQueryVariables,
  APITypes.EmailListsEmailCampaignsByEmailCampaignIdQuery
>;
export const emailListsEmailCampaignsByEmailListName = /* GraphQL */ `query EmailListsEmailCampaignsByEmailListName(
  $emailListName: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailListsEmailCampaignsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailListsEmailCampaignsByEmailListName(
    emailListName: $emailListName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListName
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
  APITypes.EmailListsEmailCampaignsByEmailListNameQueryVariables,
  APITypes.EmailListsEmailCampaignsByEmailListNameQuery
>;
export const getEmailRecipientsEmailLists = /* GraphQL */ `query GetEmailRecipientsEmailLists($id: ID!) {
  getEmailRecipientsEmailLists(id: $id) {
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
  APITypes.GetEmailRecipientsEmailListsQueryVariables,
  APITypes.GetEmailRecipientsEmailListsQuery
>;
export const listEmailRecipientsEmailLists = /* GraphQL */ `query ListEmailRecipientsEmailLists(
  $filter: ModelEmailRecipientsEmailListsFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailRecipientsEmailLists(
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
  APITypes.ListEmailRecipientsEmailListsQueryVariables,
  APITypes.ListEmailRecipientsEmailListsQuery
>;
export const syncEmailRecipientsEmailLists = /* GraphQL */ `query SyncEmailRecipientsEmailLists(
  $filter: ModelEmailRecipientsEmailListsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailRecipientsEmailLists(
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
  APITypes.SyncEmailRecipientsEmailListsQueryVariables,
  APITypes.SyncEmailRecipientsEmailListsQuery
>;
export const emailRecipientsEmailListsByEmailListName = /* GraphQL */ `query EmailRecipientsEmailListsByEmailListName(
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
` as GeneratedQuery<
  APITypes.EmailRecipientsEmailListsByEmailListNameQueryVariables,
  APITypes.EmailRecipientsEmailListsByEmailListNameQuery
>;
export const emailRecipientsEmailListsByEmailRecipientEmail = /* GraphQL */ `query EmailRecipientsEmailListsByEmailRecipientEmail(
  $emailRecipientEmail: AWSEmail!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientsEmailListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientsEmailListsByEmailRecipientEmail(
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
  APITypes.EmailRecipientsEmailListsByEmailRecipientEmailQueryVariables,
  APITypes.EmailRecipientsEmailListsByEmailRecipientEmailQuery
>;
