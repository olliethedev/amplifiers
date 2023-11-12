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
export const getEmailList = /* GraphQL */ `query GetEmailList($id: ID!) {
  getEmailList(id: $id) {
    id
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
  $filter: ModelEmailListFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
      id
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
export const getEmailRecipient = /* GraphQL */ `query GetEmailRecipient($id: ID!) {
  getEmailRecipient(id: $id) {
    id
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
  $filter: ModelEmailRecipientFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailRecipients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
      id
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
export const getEmailCampaignLists = /* GraphQL */ `query GetEmailCampaignLists($id: ID!) {
  getEmailCampaignLists(id: $id) {
    id
    emailCampaignId
    emailListId
    emailCampaign {
      id
      name
      emailSubject
      emailContent
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    emailList {
      id
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
  APITypes.GetEmailCampaignListsQueryVariables,
  APITypes.GetEmailCampaignListsQuery
>;
export const listEmailCampaignLists = /* GraphQL */ `query ListEmailCampaignLists(
  $filter: ModelEmailCampaignListsFilterInput
  $limit: Int
  $nextToken: String
) {
  listEmailCampaignLists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListId
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
  APITypes.ListEmailCampaignListsQueryVariables,
  APITypes.ListEmailCampaignListsQuery
>;
export const syncEmailCampaignLists = /* GraphQL */ `query SyncEmailCampaignLists(
  $filter: ModelEmailCampaignListsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEmailCampaignLists(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      emailCampaignId
      emailListId
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
  APITypes.SyncEmailCampaignListsQueryVariables,
  APITypes.SyncEmailCampaignListsQuery
>;
export const getEmailRecipientLists = /* GraphQL */ `query GetEmailRecipientLists($id: ID!) {
  getEmailRecipientLists(id: $id) {
    id
    emailListId
    emailRecipientId
    emailList {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    emailRecipient {
      id
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
      emailListId
      emailRecipientId
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
      emailListId
      emailRecipientId
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
export const emailRecipientsByEmail = /* GraphQL */ `query EmailRecipientsByEmail(
  $email: String!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientsByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
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
  APITypes.EmailRecipientsByEmailQueryVariables,
  APITypes.EmailRecipientsByEmailQuery
>;
export const emailCampaignListsByEmailCampaignId = /* GraphQL */ `query EmailCampaignListsByEmailCampaignId(
  $emailCampaignId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailCampaignListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailCampaignListsByEmailCampaignId(
    emailCampaignId: $emailCampaignId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListId
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
  APITypes.EmailCampaignListsByEmailCampaignIdQueryVariables,
  APITypes.EmailCampaignListsByEmailCampaignIdQuery
>;
export const emailCampaignListsByEmailListId = /* GraphQL */ `query EmailCampaignListsByEmailListId(
  $emailListId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailCampaignListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailCampaignListsByEmailListId(
    emailListId: $emailListId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailCampaignId
      emailListId
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
  APITypes.EmailCampaignListsByEmailListIdQueryVariables,
  APITypes.EmailCampaignListsByEmailListIdQuery
>;
export const emailRecipientListsByEmailListId = /* GraphQL */ `query EmailRecipientListsByEmailListId(
  $emailListId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientListsByEmailListId(
    emailListId: $emailListId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailListId
      emailRecipientId
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
  APITypes.EmailRecipientListsByEmailListIdQueryVariables,
  APITypes.EmailRecipientListsByEmailListIdQuery
>;
export const emailRecipientListsByEmailRecipientId = /* GraphQL */ `query EmailRecipientListsByEmailRecipientId(
  $emailRecipientId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEmailRecipientListsFilterInput
  $limit: Int
  $nextToken: String
) {
  emailRecipientListsByEmailRecipientId(
    emailRecipientId: $emailRecipientId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      emailListId
      emailRecipientId
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
  APITypes.EmailRecipientListsByEmailRecipientIdQueryVariables,
  APITypes.EmailRecipientListsByEmailRecipientIdQuery
>;
