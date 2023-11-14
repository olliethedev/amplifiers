/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEmailCampaign = /* GraphQL */ `subscription OnCreateEmailCampaign(
  $filter: ModelSubscriptionEmailCampaignFilterInput
) {
  onCreateEmailCampaign(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmailCampaignSubscriptionVariables,
  APITypes.OnCreateEmailCampaignSubscription
>;
export const onUpdateEmailCampaign = /* GraphQL */ `subscription OnUpdateEmailCampaign(
  $filter: ModelSubscriptionEmailCampaignFilterInput
) {
  onUpdateEmailCampaign(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmailCampaignSubscriptionVariables,
  APITypes.OnUpdateEmailCampaignSubscription
>;
export const onDeleteEmailCampaign = /* GraphQL */ `subscription OnDeleteEmailCampaign(
  $filter: ModelSubscriptionEmailCampaignFilterInput
) {
  onDeleteEmailCampaign(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmailCampaignSubscriptionVariables,
  APITypes.OnDeleteEmailCampaignSubscription
>;
export const onCreateEmailList = /* GraphQL */ `subscription OnCreateEmailList($filter: ModelSubscriptionEmailListFilterInput) {
  onCreateEmailList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmailListSubscriptionVariables,
  APITypes.OnCreateEmailListSubscription
>;
export const onUpdateEmailList = /* GraphQL */ `subscription OnUpdateEmailList($filter: ModelSubscriptionEmailListFilterInput) {
  onUpdateEmailList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmailListSubscriptionVariables,
  APITypes.OnUpdateEmailListSubscription
>;
export const onDeleteEmailList = /* GraphQL */ `subscription OnDeleteEmailList($filter: ModelSubscriptionEmailListFilterInput) {
  onDeleteEmailList(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmailListSubscriptionVariables,
  APITypes.OnDeleteEmailListSubscription
>;
export const onCreateEmailRecipient = /* GraphQL */ `subscription OnCreateEmailRecipient(
  $filter: ModelSubscriptionEmailRecipientFilterInput
) {
  onCreateEmailRecipient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmailRecipientSubscriptionVariables,
  APITypes.OnCreateEmailRecipientSubscription
>;
export const onUpdateEmailRecipient = /* GraphQL */ `subscription OnUpdateEmailRecipient(
  $filter: ModelSubscriptionEmailRecipientFilterInput
) {
  onUpdateEmailRecipient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmailRecipientSubscriptionVariables,
  APITypes.OnUpdateEmailRecipientSubscription
>;
export const onDeleteEmailRecipient = /* GraphQL */ `subscription OnDeleteEmailRecipient(
  $filter: ModelSubscriptionEmailRecipientFilterInput
) {
  onDeleteEmailRecipient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmailRecipientSubscriptionVariables,
  APITypes.OnDeleteEmailRecipientSubscription
>;
export const onCreateEmailRecipientLists = /* GraphQL */ `subscription OnCreateEmailRecipientLists(
  $filter: ModelSubscriptionEmailRecipientListsFilterInput
) {
  onCreateEmailRecipientLists(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEmailRecipientListsSubscriptionVariables,
  APITypes.OnCreateEmailRecipientListsSubscription
>;
export const onUpdateEmailRecipientLists = /* GraphQL */ `subscription OnUpdateEmailRecipientLists(
  $filter: ModelSubscriptionEmailRecipientListsFilterInput
) {
  onUpdateEmailRecipientLists(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEmailRecipientListsSubscriptionVariables,
  APITypes.OnUpdateEmailRecipientListsSubscription
>;
export const onDeleteEmailRecipientLists = /* GraphQL */ `subscription OnDeleteEmailRecipientLists(
  $filter: ModelSubscriptionEmailRecipientListsFilterInput
) {
  onDeleteEmailRecipientLists(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEmailRecipientListsSubscriptionVariables,
  APITypes.OnDeleteEmailRecipientListsSubscription
>;
