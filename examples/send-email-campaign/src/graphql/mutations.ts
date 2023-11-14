/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEmailCampaign = /* GraphQL */ `mutation CreateEmailCampaign(
  $input: CreateEmailCampaignInput!
  $condition: ModelEmailCampaignConditionInput
) {
  createEmailCampaign(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEmailCampaignMutationVariables,
  APITypes.CreateEmailCampaignMutation
>;
export const updateEmailCampaign = /* GraphQL */ `mutation UpdateEmailCampaign(
  $input: UpdateEmailCampaignInput!
  $condition: ModelEmailCampaignConditionInput
) {
  updateEmailCampaign(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEmailCampaignMutationVariables,
  APITypes.UpdateEmailCampaignMutation
>;
export const deleteEmailCampaign = /* GraphQL */ `mutation DeleteEmailCampaign(
  $input: DeleteEmailCampaignInput!
  $condition: ModelEmailCampaignConditionInput
) {
  deleteEmailCampaign(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEmailCampaignMutationVariables,
  APITypes.DeleteEmailCampaignMutation
>;
export const createEmailList = /* GraphQL */ `mutation CreateEmailList(
  $input: CreateEmailListInput!
  $condition: ModelEmailListConditionInput
) {
  createEmailList(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEmailListMutationVariables,
  APITypes.CreateEmailListMutation
>;
export const updateEmailList = /* GraphQL */ `mutation UpdateEmailList(
  $input: UpdateEmailListInput!
  $condition: ModelEmailListConditionInput
) {
  updateEmailList(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEmailListMutationVariables,
  APITypes.UpdateEmailListMutation
>;
export const deleteEmailList = /* GraphQL */ `mutation DeleteEmailList(
  $input: DeleteEmailListInput!
  $condition: ModelEmailListConditionInput
) {
  deleteEmailList(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEmailListMutationVariables,
  APITypes.DeleteEmailListMutation
>;
export const createEmailRecipient = /* GraphQL */ `mutation CreateEmailRecipient(
  $input: CreateEmailRecipientInput!
  $condition: ModelEmailRecipientConditionInput
) {
  createEmailRecipient(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEmailRecipientMutationVariables,
  APITypes.CreateEmailRecipientMutation
>;
export const updateEmailRecipient = /* GraphQL */ `mutation UpdateEmailRecipient(
  $input: UpdateEmailRecipientInput!
  $condition: ModelEmailRecipientConditionInput
) {
  updateEmailRecipient(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEmailRecipientMutationVariables,
  APITypes.UpdateEmailRecipientMutation
>;
export const deleteEmailRecipient = /* GraphQL */ `mutation DeleteEmailRecipient(
  $input: DeleteEmailRecipientInput!
  $condition: ModelEmailRecipientConditionInput
) {
  deleteEmailRecipient(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEmailRecipientMutationVariables,
  APITypes.DeleteEmailRecipientMutation
>;
export const createEmailRecipientLists = /* GraphQL */ `mutation CreateEmailRecipientLists(
  $input: CreateEmailRecipientListsInput!
  $condition: ModelEmailRecipientListsConditionInput
) {
  createEmailRecipientLists(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEmailRecipientListsMutationVariables,
  APITypes.CreateEmailRecipientListsMutation
>;
export const updateEmailRecipientLists = /* GraphQL */ `mutation UpdateEmailRecipientLists(
  $input: UpdateEmailRecipientListsInput!
  $condition: ModelEmailRecipientListsConditionInput
) {
  updateEmailRecipientLists(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEmailRecipientListsMutationVariables,
  APITypes.UpdateEmailRecipientListsMutation
>;
export const deleteEmailRecipientLists = /* GraphQL */ `mutation DeleteEmailRecipientLists(
  $input: DeleteEmailRecipientListsInput!
  $condition: ModelEmailRecipientListsConditionInput
) {
  deleteEmailRecipientLists(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEmailRecipientListsMutationVariables,
  APITypes.DeleteEmailRecipientListsMutation
>;
