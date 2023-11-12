/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEmailCampaignInput = {
  id?: string | null,
  name: string,
  emailSubject: string,
  emailContent: string,
  _version?: number | null,
};

export type ModelEmailCampaignConditionInput = {
  name?: ModelStringInput | null,
  emailSubject?: ModelStringInput | null,
  emailContent?: ModelStringInput | null,
  and?: Array< ModelEmailCampaignConditionInput | null > | null,
  or?: Array< ModelEmailCampaignConditionInput | null > | null,
  not?: ModelEmailCampaignConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type EmailCampaign = {
  __typename: "EmailCampaign",
  id: string,
  name: string,
  emailSubject: string,
  emailContent: string,
  emailLists?: ModelEmailCampaignListsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelEmailCampaignListsConnection = {
  __typename: "ModelEmailCampaignListsConnection",
  items:  Array<EmailCampaignLists | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type EmailCampaignLists = {
  __typename: "EmailCampaignLists",
  id: string,
  emailCampaignId: string,
  emailListId: string,
  emailCampaign: EmailCampaign,
  emailList: EmailList,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type EmailList = {
  __typename: "EmailList",
  id: string,
  name: string,
  emailCampaigns?: ModelEmailCampaignListsConnection | null,
  emailRecipients?: ModelEmailRecipientListsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelEmailRecipientListsConnection = {
  __typename: "ModelEmailRecipientListsConnection",
  items:  Array<EmailRecipientLists | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type EmailRecipientLists = {
  __typename: "EmailRecipientLists",
  id: string,
  emailListId: string,
  emailRecipientId: string,
  emailList: EmailList,
  emailRecipient: EmailRecipient,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type EmailRecipient = {
  __typename: "EmailRecipient",
  id: string,
  email: string,
  emailLists?: ModelEmailRecipientListsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateEmailCampaignInput = {
  id: string,
  name?: string | null,
  emailSubject?: string | null,
  emailContent?: string | null,
  _version?: number | null,
};

export type DeleteEmailCampaignInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmailListInput = {
  id?: string | null,
  name: string,
  _version?: number | null,
};

export type ModelEmailListConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelEmailListConditionInput | null > | null,
  or?: Array< ModelEmailListConditionInput | null > | null,
  not?: ModelEmailListConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateEmailListInput = {
  id: string,
  name?: string | null,
  _version?: number | null,
};

export type DeleteEmailListInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmailRecipientInput = {
  id?: string | null,
  email: string,
  _version?: number | null,
};

export type ModelEmailRecipientConditionInput = {
  email?: ModelStringInput | null,
  and?: Array< ModelEmailRecipientConditionInput | null > | null,
  or?: Array< ModelEmailRecipientConditionInput | null > | null,
  not?: ModelEmailRecipientConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateEmailRecipientInput = {
  id: string,
  email?: string | null,
  _version?: number | null,
};

export type DeleteEmailRecipientInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmailCampaignListsInput = {
  id?: string | null,
  emailCampaignId: string,
  emailListId: string,
  _version?: number | null,
};

export type ModelEmailCampaignListsConditionInput = {
  emailCampaignId?: ModelIDInput | null,
  emailListId?: ModelIDInput | null,
  and?: Array< ModelEmailCampaignListsConditionInput | null > | null,
  or?: Array< ModelEmailCampaignListsConditionInput | null > | null,
  not?: ModelEmailCampaignListsConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateEmailCampaignListsInput = {
  id: string,
  emailCampaignId?: string | null,
  emailListId?: string | null,
  _version?: number | null,
};

export type DeleteEmailCampaignListsInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmailRecipientListsInput = {
  id?: string | null,
  emailListId: string,
  emailRecipientId: string,
  _version?: number | null,
};

export type ModelEmailRecipientListsConditionInput = {
  emailListId?: ModelIDInput | null,
  emailRecipientId?: ModelIDInput | null,
  and?: Array< ModelEmailRecipientListsConditionInput | null > | null,
  or?: Array< ModelEmailRecipientListsConditionInput | null > | null,
  not?: ModelEmailRecipientListsConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateEmailRecipientListsInput = {
  id: string,
  emailListId?: string | null,
  emailRecipientId?: string | null,
  _version?: number | null,
};

export type DeleteEmailRecipientListsInput = {
  id: string,
  _version?: number | null,
};

export type ModelEmailCampaignFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  emailSubject?: ModelStringInput | null,
  emailContent?: ModelStringInput | null,
  and?: Array< ModelEmailCampaignFilterInput | null > | null,
  or?: Array< ModelEmailCampaignFilterInput | null > | null,
  not?: ModelEmailCampaignFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelEmailCampaignConnection = {
  __typename: "ModelEmailCampaignConnection",
  items:  Array<EmailCampaign | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelEmailListFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelEmailListFilterInput | null > | null,
  or?: Array< ModelEmailListFilterInput | null > | null,
  not?: ModelEmailListFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelEmailListConnection = {
  __typename: "ModelEmailListConnection",
  items:  Array<EmailList | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelEmailRecipientFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelEmailRecipientFilterInput | null > | null,
  or?: Array< ModelEmailRecipientFilterInput | null > | null,
  not?: ModelEmailRecipientFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelEmailRecipientConnection = {
  __typename: "ModelEmailRecipientConnection",
  items:  Array<EmailRecipient | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelEmailCampaignListsFilterInput = {
  id?: ModelIDInput | null,
  emailCampaignId?: ModelIDInput | null,
  emailListId?: ModelIDInput | null,
  and?: Array< ModelEmailCampaignListsFilterInput | null > | null,
  or?: Array< ModelEmailCampaignListsFilterInput | null > | null,
  not?: ModelEmailCampaignListsFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelEmailRecipientListsFilterInput = {
  id?: ModelIDInput | null,
  emailListId?: ModelIDInput | null,
  emailRecipientId?: ModelIDInput | null,
  and?: Array< ModelEmailRecipientListsFilterInput | null > | null,
  or?: Array< ModelEmailRecipientListsFilterInput | null > | null,
  not?: ModelEmailRecipientListsFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionEmailCampaignFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  emailSubject?: ModelSubscriptionStringInput | null,
  emailContent?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmailCampaignFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailCampaignFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionEmailListFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmailListFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailListFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailRecipientFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmailRecipientFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailRecipientFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailCampaignListsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  emailCampaignId?: ModelSubscriptionIDInput | null,
  emailListId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionEmailCampaignListsFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailCampaignListsFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailRecipientListsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  emailListId?: ModelSubscriptionIDInput | null,
  emailRecipientId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionEmailRecipientListsFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailRecipientListsFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateEmailCampaignMutationVariables = {
  input: CreateEmailCampaignInput,
  condition?: ModelEmailCampaignConditionInput | null,
};

export type CreateEmailCampaignMutation = {
  createEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEmailCampaignMutationVariables = {
  input: UpdateEmailCampaignInput,
  condition?: ModelEmailCampaignConditionInput | null,
};

export type UpdateEmailCampaignMutation = {
  updateEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEmailCampaignMutationVariables = {
  input: DeleteEmailCampaignInput,
  condition?: ModelEmailCampaignConditionInput | null,
};

export type DeleteEmailCampaignMutation = {
  deleteEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEmailListMutationVariables = {
  input: CreateEmailListInput,
  condition?: ModelEmailListConditionInput | null,
};

export type CreateEmailListMutation = {
  createEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEmailListMutationVariables = {
  input: UpdateEmailListInput,
  condition?: ModelEmailListConditionInput | null,
};

export type UpdateEmailListMutation = {
  updateEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEmailListMutationVariables = {
  input: DeleteEmailListInput,
  condition?: ModelEmailListConditionInput | null,
};

export type DeleteEmailListMutation = {
  deleteEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEmailRecipientMutationVariables = {
  input: CreateEmailRecipientInput,
  condition?: ModelEmailRecipientConditionInput | null,
};

export type CreateEmailRecipientMutation = {
  createEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEmailRecipientMutationVariables = {
  input: UpdateEmailRecipientInput,
  condition?: ModelEmailRecipientConditionInput | null,
};

export type UpdateEmailRecipientMutation = {
  updateEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEmailRecipientMutationVariables = {
  input: DeleteEmailRecipientInput,
  condition?: ModelEmailRecipientConditionInput | null,
};

export type DeleteEmailRecipientMutation = {
  deleteEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEmailCampaignListsMutationVariables = {
  input: CreateEmailCampaignListsInput,
  condition?: ModelEmailCampaignListsConditionInput | null,
};

export type CreateEmailCampaignListsMutation = {
  createEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEmailCampaignListsMutationVariables = {
  input: UpdateEmailCampaignListsInput,
  condition?: ModelEmailCampaignListsConditionInput | null,
};

export type UpdateEmailCampaignListsMutation = {
  updateEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEmailCampaignListsMutationVariables = {
  input: DeleteEmailCampaignListsInput,
  condition?: ModelEmailCampaignListsConditionInput | null,
};

export type DeleteEmailCampaignListsMutation = {
  deleteEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEmailRecipientListsMutationVariables = {
  input: CreateEmailRecipientListsInput,
  condition?: ModelEmailRecipientListsConditionInput | null,
};

export type CreateEmailRecipientListsMutation = {
  createEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEmailRecipientListsMutationVariables = {
  input: UpdateEmailRecipientListsInput,
  condition?: ModelEmailRecipientListsConditionInput | null,
};

export type UpdateEmailRecipientListsMutation = {
  updateEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEmailRecipientListsMutationVariables = {
  input: DeleteEmailRecipientListsInput,
  condition?: ModelEmailRecipientListsConditionInput | null,
};

export type DeleteEmailRecipientListsMutation = {
  deleteEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetEmailCampaignQueryVariables = {
  id: string,
};

export type GetEmailCampaignQuery = {
  getEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEmailCampaignsQueryVariables = {
  filter?: ModelEmailCampaignFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailCampaignsQuery = {
  listEmailCampaigns?:  {
    __typename: "ModelEmailCampaignConnection",
    items:  Array< {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmailCampaignsQueryVariables = {
  filter?: ModelEmailCampaignFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailCampaignsQuery = {
  syncEmailCampaigns?:  {
    __typename: "ModelEmailCampaignConnection",
    items:  Array< {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEmailListQueryVariables = {
  id: string,
};

export type GetEmailListQuery = {
  getEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEmailListsQueryVariables = {
  filter?: ModelEmailListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailListsQuery = {
  listEmailLists?:  {
    __typename: "ModelEmailListConnection",
    items:  Array< {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmailListsQueryVariables = {
  filter?: ModelEmailListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailListsQuery = {
  syncEmailLists?:  {
    __typename: "ModelEmailListConnection",
    items:  Array< {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEmailRecipientQueryVariables = {
  id: string,
};

export type GetEmailRecipientQuery = {
  getEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEmailRecipientsQueryVariables = {
  filter?: ModelEmailRecipientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailRecipientsQuery = {
  listEmailRecipients?:  {
    __typename: "ModelEmailRecipientConnection",
    items:  Array< {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmailRecipientsQueryVariables = {
  filter?: ModelEmailRecipientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailRecipientsQuery = {
  syncEmailRecipients?:  {
    __typename: "ModelEmailRecipientConnection",
    items:  Array< {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEmailCampaignListsQueryVariables = {
  id: string,
};

export type GetEmailCampaignListsQuery = {
  getEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEmailCampaignListsQueryVariables = {
  filter?: ModelEmailCampaignListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailCampaignListsQuery = {
  listEmailCampaignLists?:  {
    __typename: "ModelEmailCampaignListsConnection",
    items:  Array< {
      __typename: "EmailCampaignLists",
      id: string,
      emailCampaignId: string,
      emailListId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmailCampaignListsQueryVariables = {
  filter?: ModelEmailCampaignListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailCampaignListsQuery = {
  syncEmailCampaignLists?:  {
    __typename: "ModelEmailCampaignListsConnection",
    items:  Array< {
      __typename: "EmailCampaignLists",
      id: string,
      emailCampaignId: string,
      emailListId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEmailRecipientListsQueryVariables = {
  id: string,
};

export type GetEmailRecipientListsQuery = {
  getEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEmailRecipientListsQueryVariables = {
  filter?: ModelEmailRecipientListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailRecipientListsQuery = {
  listEmailRecipientLists?:  {
    __typename: "ModelEmailRecipientListsConnection",
    items:  Array< {
      __typename: "EmailRecipientLists",
      id: string,
      emailListId: string,
      emailRecipientId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEmailRecipientListsQueryVariables = {
  filter?: ModelEmailRecipientListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailRecipientListsQuery = {
  syncEmailRecipientLists?:  {
    __typename: "ModelEmailRecipientListsConnection",
    items:  Array< {
      __typename: "EmailRecipientLists",
      id: string,
      emailListId: string,
      emailRecipientId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmailRecipientsByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailRecipientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailRecipientsByEmailQuery = {
  emailRecipientsByEmail?:  {
    __typename: "ModelEmailRecipientConnection",
    items:  Array< {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmailCampaignListsByEmailCampaignIdQueryVariables = {
  emailCampaignId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailCampaignListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailCampaignListsByEmailCampaignIdQuery = {
  emailCampaignListsByEmailCampaignId?:  {
    __typename: "ModelEmailCampaignListsConnection",
    items:  Array< {
      __typename: "EmailCampaignLists",
      id: string,
      emailCampaignId: string,
      emailListId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmailCampaignListsByEmailListIdQueryVariables = {
  emailListId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailCampaignListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailCampaignListsByEmailListIdQuery = {
  emailCampaignListsByEmailListId?:  {
    __typename: "ModelEmailCampaignListsConnection",
    items:  Array< {
      __typename: "EmailCampaignLists",
      id: string,
      emailCampaignId: string,
      emailListId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmailRecipientListsByEmailListIdQueryVariables = {
  emailListId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailRecipientListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailRecipientListsByEmailListIdQuery = {
  emailRecipientListsByEmailListId?:  {
    __typename: "ModelEmailRecipientListsConnection",
    items:  Array< {
      __typename: "EmailRecipientLists",
      id: string,
      emailListId: string,
      emailRecipientId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EmailRecipientListsByEmailRecipientIdQueryVariables = {
  emailRecipientId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailRecipientListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailRecipientListsByEmailRecipientIdQuery = {
  emailRecipientListsByEmailRecipientId?:  {
    __typename: "ModelEmailRecipientListsConnection",
    items:  Array< {
      __typename: "EmailRecipientLists",
      id: string,
      emailListId: string,
      emailRecipientId: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateEmailCampaignSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignFilterInput | null,
};

export type OnCreateEmailCampaignSubscription = {
  onCreateEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEmailCampaignSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignFilterInput | null,
};

export type OnUpdateEmailCampaignSubscription = {
  onUpdateEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEmailCampaignSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignFilterInput | null,
};

export type OnDeleteEmailCampaignSubscription = {
  onDeleteEmailCampaign?:  {
    __typename: "EmailCampaign",
    id: string,
    name: string,
    emailSubject: string,
    emailContent: string,
    emailLists?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEmailListSubscriptionVariables = {
  filter?: ModelSubscriptionEmailListFilterInput | null,
};

export type OnCreateEmailListSubscription = {
  onCreateEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEmailListSubscriptionVariables = {
  filter?: ModelSubscriptionEmailListFilterInput | null,
};

export type OnUpdateEmailListSubscription = {
  onUpdateEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEmailListSubscriptionVariables = {
  filter?: ModelSubscriptionEmailListFilterInput | null,
};

export type OnDeleteEmailListSubscription = {
  onDeleteEmailList?:  {
    __typename: "EmailList",
    id: string,
    name: string,
    emailCampaigns?:  {
      __typename: "ModelEmailCampaignListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEmailRecipientSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientFilterInput | null,
};

export type OnCreateEmailRecipientSubscription = {
  onCreateEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEmailRecipientSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientFilterInput | null,
};

export type OnUpdateEmailRecipientSubscription = {
  onUpdateEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEmailRecipientSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientFilterInput | null,
};

export type OnDeleteEmailRecipientSubscription = {
  onDeleteEmailRecipient?:  {
    __typename: "EmailRecipient",
    id: string,
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientListsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEmailCampaignListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignListsFilterInput | null,
};

export type OnCreateEmailCampaignListsSubscription = {
  onCreateEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEmailCampaignListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignListsFilterInput | null,
};

export type OnUpdateEmailCampaignListsSubscription = {
  onUpdateEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEmailCampaignListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailCampaignListsFilterInput | null,
};

export type OnDeleteEmailCampaignListsSubscription = {
  onDeleteEmailCampaignLists?:  {
    __typename: "EmailCampaignLists",
    id: string,
    emailCampaignId: string,
    emailListId: string,
    emailCampaign:  {
      __typename: "EmailCampaign",
      id: string,
      name: string,
      emailSubject: string,
      emailContent: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEmailRecipientListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientListsFilterInput | null,
};

export type OnCreateEmailRecipientListsSubscription = {
  onCreateEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEmailRecipientListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientListsFilterInput | null,
};

export type OnUpdateEmailRecipientListsSubscription = {
  onUpdateEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEmailRecipientListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientListsFilterInput | null,
};

export type OnDeleteEmailRecipientListsSubscription = {
  onDeleteEmailRecipientLists?:  {
    __typename: "EmailRecipientLists",
    id: string,
    emailListId: string,
    emailRecipientId: string,
    emailList:  {
      __typename: "EmailList",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
