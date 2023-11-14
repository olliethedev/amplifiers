/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEmailCampaignInput = {
  id?: string | null,
  name: string,
  emailSubject: string,
  emailContent: string,
  emailSender?: string | null,
  emailLists: Array< string >,
  _version?: number | null,
};

export type ModelEmailCampaignConditionInput = {
  name?: ModelStringInput | null,
  emailSubject?: ModelStringInput | null,
  emailContent?: ModelStringInput | null,
  emailSender?: ModelStringInput | null,
  emailLists?: ModelStringInput | null,
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
  emailSender?: string | null,
  emailLists: Array< string >,
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
  emailSender?: string | null,
  emailLists?: Array< string > | null,
  _version?: number | null,
};

export type DeleteEmailCampaignInput = {
  id: string,
  _version?: number | null,
};

export type CreateEmailListInput = {
  name: string,
  _version?: number | null,
};

export type ModelEmailListConditionInput = {
  and?: Array< ModelEmailListConditionInput | null > | null,
  or?: Array< ModelEmailListConditionInput | null > | null,
  not?: ModelEmailListConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type EmailList = {
  __typename: "EmailList",
  name: string,
  emailRecipients?: ModelEmailRecipientsEmailListsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelEmailRecipientsEmailListsConnection = {
  __typename: "ModelEmailRecipientsEmailListsConnection",
  items:  Array<EmailRecipientsEmailLists | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type EmailRecipientsEmailLists = {
  __typename: "EmailRecipientsEmailLists",
  id: string,
  emailListName: string,
  emailRecipientEmail: string,
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
  email: string,
  emailLists?: ModelEmailRecipientsEmailListsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateEmailListInput = {
  name: string,
  _version?: number | null,
};

export type DeleteEmailListInput = {
  name: string,
  _version?: number | null,
};

export type CreateEmailRecipientInput = {
  email: string,
  _version?: number | null,
};

export type ModelEmailRecipientConditionInput = {
  and?: Array< ModelEmailRecipientConditionInput | null > | null,
  or?: Array< ModelEmailRecipientConditionInput | null > | null,
  not?: ModelEmailRecipientConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateEmailRecipientInput = {
  email: string,
  _version?: number | null,
};

export type DeleteEmailRecipientInput = {
  email: string,
  _version?: number | null,
};

export type CreateEmailRecipientsEmailListsInput = {
  id?: string | null,
  emailListName: string,
  emailRecipientEmail: string,
  _version?: number | null,
};

export type ModelEmailRecipientsEmailListsConditionInput = {
  emailListName?: ModelIDInput | null,
  emailRecipientEmail?: ModelStringInput | null,
  and?: Array< ModelEmailRecipientsEmailListsConditionInput | null > | null,
  or?: Array< ModelEmailRecipientsEmailListsConditionInput | null > | null,
  not?: ModelEmailRecipientsEmailListsConditionInput | null,
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

export type UpdateEmailRecipientsEmailListsInput = {
  id: string,
  emailListName?: string | null,
  emailRecipientEmail?: string | null,
  _version?: number | null,
};

export type DeleteEmailRecipientsEmailListsInput = {
  id: string,
  _version?: number | null,
};

export type ModelEmailCampaignFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  emailSubject?: ModelStringInput | null,
  emailContent?: ModelStringInput | null,
  emailSender?: ModelStringInput | null,
  emailLists?: ModelStringInput | null,
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
  name?: ModelIDInput | null,
  and?: Array< ModelEmailListFilterInput | null > | null,
  or?: Array< ModelEmailListFilterInput | null > | null,
  not?: ModelEmailListFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelEmailListConnection = {
  __typename: "ModelEmailListConnection",
  items:  Array<EmailList | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelEmailRecipientFilterInput = {
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

export type ModelEmailRecipientsEmailListsFilterInput = {
  id?: ModelIDInput | null,
  emailListName?: ModelIDInput | null,
  emailRecipientEmail?: ModelStringInput | null,
  and?: Array< ModelEmailRecipientsEmailListsFilterInput | null > | null,
  or?: Array< ModelEmailRecipientsEmailListsFilterInput | null > | null,
  not?: ModelEmailRecipientsEmailListsFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailCampaignFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  emailSubject?: ModelSubscriptionStringInput | null,
  emailContent?: ModelSubscriptionStringInput | null,
  emailSender?: ModelSubscriptionStringInput | null,
  emailLists?: ModelSubscriptionStringInput | null,
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
  name?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionEmailListFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailListFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailRecipientFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmailRecipientFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailRecipientFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEmailRecipientsEmailListsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  emailListName?: ModelSubscriptionIDInput | null,
  emailRecipientEmail?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEmailRecipientsEmailListsFilterInput | null > | null,
  or?: Array< ModelSubscriptionEmailRecipientsEmailListsFilterInput | null > | null,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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

export type CreateEmailRecipientsEmailListsMutationVariables = {
  input: CreateEmailRecipientsEmailListsInput,
  condition?: ModelEmailRecipientsEmailListsConditionInput | null,
};

export type CreateEmailRecipientsEmailListsMutation = {
  createEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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

export type UpdateEmailRecipientsEmailListsMutationVariables = {
  input: UpdateEmailRecipientsEmailListsInput,
  condition?: ModelEmailRecipientsEmailListsConditionInput | null,
};

export type UpdateEmailRecipientsEmailListsMutation = {
  updateEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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

export type DeleteEmailRecipientsEmailListsMutationVariables = {
  input: DeleteEmailRecipientsEmailListsInput,
  condition?: ModelEmailRecipientsEmailListsConditionInput | null,
};

export type DeleteEmailRecipientsEmailListsMutation = {
  deleteEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
      emailSender?: string | null,
      emailLists: Array< string >,
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
      emailSender?: string | null,
      emailLists: Array< string >,
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
  name: string,
};

export type GetEmailListQuery = {
  getEmailList?:  {
    __typename: "EmailList",
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
  name?: string | null,
  filter?: ModelEmailListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEmailListsQuery = {
  listEmailLists?:  {
    __typename: "ModelEmailListConnection",
    items:  Array< {
      __typename: "EmailList",
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
  email: string,
};

export type GetEmailRecipientQuery = {
  getEmailRecipient?:  {
    __typename: "EmailRecipient",
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
  email?: string | null,
  filter?: ModelEmailRecipientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListEmailRecipientsQuery = {
  listEmailRecipients?:  {
    __typename: "ModelEmailRecipientConnection",
    items:  Array< {
      __typename: "EmailRecipient",
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

export type GetEmailRecipientsEmailListsQueryVariables = {
  id: string,
};

export type GetEmailRecipientsEmailListsQuery = {
  getEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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

export type ListEmailRecipientsEmailListsQueryVariables = {
  filter?: ModelEmailRecipientsEmailListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmailRecipientsEmailListsQuery = {
  listEmailRecipientsEmailLists?:  {
    __typename: "ModelEmailRecipientsEmailListsConnection",
    items:  Array< {
      __typename: "EmailRecipientsEmailLists",
      id: string,
      emailListName: string,
      emailRecipientEmail: string,
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

export type SyncEmailRecipientsEmailListsQueryVariables = {
  filter?: ModelEmailRecipientsEmailListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEmailRecipientsEmailListsQuery = {
  syncEmailRecipientsEmailLists?:  {
    __typename: "ModelEmailRecipientsEmailListsConnection",
    items:  Array< {
      __typename: "EmailRecipientsEmailLists",
      id: string,
      emailListName: string,
      emailRecipientEmail: string,
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

export type EmailRecipientsEmailListsByEmailListNameQueryVariables = {
  emailListName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailRecipientsEmailListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailRecipientsEmailListsByEmailListNameQuery = {
  emailRecipientsEmailListsByEmailListName?:  {
    __typename: "ModelEmailRecipientsEmailListsConnection",
    items:  Array< {
      __typename: "EmailRecipientsEmailLists",
      id: string,
      emailListName: string,
      emailRecipientEmail: string,
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

export type EmailRecipientsEmailListsByEmailRecipientEmailQueryVariables = {
  emailRecipientEmail: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmailRecipientsEmailListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmailRecipientsEmailListsByEmailRecipientEmailQuery = {
  emailRecipientsEmailListsByEmailRecipientEmail?:  {
    __typename: "ModelEmailRecipientsEmailListsConnection",
    items:  Array< {
      __typename: "EmailRecipientsEmailLists",
      id: string,
      emailListName: string,
      emailRecipientEmail: string,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    emailSender?: string | null,
    emailLists: Array< string >,
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    name: string,
    emailRecipients?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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
    email: string,
    emailLists?:  {
      __typename: "ModelEmailRecipientsEmailListsConnection",
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

export type OnCreateEmailRecipientsEmailListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientsEmailListsFilterInput | null,
};

export type OnCreateEmailRecipientsEmailListsSubscription = {
  onCreateEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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

export type OnUpdateEmailRecipientsEmailListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientsEmailListsFilterInput | null,
};

export type OnUpdateEmailRecipientsEmailListsSubscription = {
  onUpdateEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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

export type OnDeleteEmailRecipientsEmailListsSubscriptionVariables = {
  filter?: ModelSubscriptionEmailRecipientsEmailListsFilterInput | null,
};

export type OnDeleteEmailRecipientsEmailListsSubscription = {
  onDeleteEmailRecipientsEmailLists?:  {
    __typename: "EmailRecipientsEmailLists",
    id: string,
    emailListName: string,
    emailRecipientEmail: string,
    emailList:  {
      __typename: "EmailList",
      name: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    },
    emailRecipient:  {
      __typename: "EmailRecipient",
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
