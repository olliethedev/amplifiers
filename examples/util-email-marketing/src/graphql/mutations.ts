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
  APITypes.DeleteEmailCampaignMutationVariables,
  APITypes.DeleteEmailCampaignMutation
>;
export const createEmailList = /* GraphQL */ `mutation CreateEmailList(
  $input: CreateEmailListInput!
  $condition: ModelEmailListConditionInput
) {
  createEmailList(input: $input, condition: $condition) {
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
export const createEmailListsEmailCampaigns = /* GraphQL */ `mutation CreateEmailListsEmailCampaigns(
  $input: CreateEmailListsEmailCampaignsInput!
  $condition: ModelEmailListsEmailCampaignsConditionInput
) {
  createEmailListsEmailCampaigns(input: $input, condition: $condition) {
    id
    emailCampaignId
    emailListName
    emailCampaign {
      id
      name
      emailSubject
      emailContent
      emailSender
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
` as GeneratedMutation<
  APITypes.CreateEmailListsEmailCampaignsMutationVariables,
  APITypes.CreateEmailListsEmailCampaignsMutation
>;
export const updateEmailListsEmailCampaigns = /* GraphQL */ `mutation UpdateEmailListsEmailCampaigns(
  $input: UpdateEmailListsEmailCampaignsInput!
  $condition: ModelEmailListsEmailCampaignsConditionInput
) {
  updateEmailListsEmailCampaigns(input: $input, condition: $condition) {
    id
    emailCampaignId
    emailListName
    emailCampaign {
      id
      name
      emailSubject
      emailContent
      emailSender
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
` as GeneratedMutation<
  APITypes.UpdateEmailListsEmailCampaignsMutationVariables,
  APITypes.UpdateEmailListsEmailCampaignsMutation
>;
export const deleteEmailListsEmailCampaigns = /* GraphQL */ `mutation DeleteEmailListsEmailCampaigns(
  $input: DeleteEmailListsEmailCampaignsInput!
  $condition: ModelEmailListsEmailCampaignsConditionInput
) {
  deleteEmailListsEmailCampaigns(input: $input, condition: $condition) {
    id
    emailCampaignId
    emailListName
    emailCampaign {
      id
      name
      emailSubject
      emailContent
      emailSender
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
` as GeneratedMutation<
  APITypes.DeleteEmailListsEmailCampaignsMutationVariables,
  APITypes.DeleteEmailListsEmailCampaignsMutation
>;
export const createEmailRecipientsEmailLists = /* GraphQL */ `mutation CreateEmailRecipientsEmailLists(
  $input: CreateEmailRecipientsEmailListsInput!
  $condition: ModelEmailRecipientsEmailListsConditionInput
) {
  createEmailRecipientsEmailLists(input: $input, condition: $condition) {
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
  APITypes.CreateEmailRecipientsEmailListsMutationVariables,
  APITypes.CreateEmailRecipientsEmailListsMutation
>;
export const updateEmailRecipientsEmailLists = /* GraphQL */ `mutation UpdateEmailRecipientsEmailLists(
  $input: UpdateEmailRecipientsEmailListsInput!
  $condition: ModelEmailRecipientsEmailListsConditionInput
) {
  updateEmailRecipientsEmailLists(input: $input, condition: $condition) {
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
  APITypes.UpdateEmailRecipientsEmailListsMutationVariables,
  APITypes.UpdateEmailRecipientsEmailListsMutation
>;
export const deleteEmailRecipientsEmailLists = /* GraphQL */ `mutation DeleteEmailRecipientsEmailLists(
  $input: DeleteEmailRecipientsEmailListsInput!
  $condition: ModelEmailRecipientsEmailListsConditionInput
) {
  deleteEmailRecipientsEmailLists(input: $input, condition: $condition) {
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
  APITypes.DeleteEmailRecipientsEmailListsMutationVariables,
  APITypes.DeleteEmailRecipientsEmailListsMutation
>;
