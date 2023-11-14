import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerEmailCampaign = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailCampaign, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly emailSubject: string;
  readonly emailContent: string;
  readonly emailSender: string;
  readonly emailLists: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmailCampaign = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailCampaign, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly emailSubject: string;
  readonly emailContent: string;
  readonly emailSender: string;
  readonly emailLists: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmailCampaign = LazyLoading extends LazyLoadingDisabled ? EagerEmailCampaign : LazyEmailCampaign

export declare const EmailCampaign: (new (init: ModelInit<EmailCampaign>) => EmailCampaign) & {
  copyOf(source: EmailCampaign, mutator: (draft: MutableModel<EmailCampaign>) => MutableModel<EmailCampaign> | void): EmailCampaign;
}

type EagerEmailList = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<EmailList, 'name'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly name: string;
  readonly emailRecipients?: EmailRecipientLists[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmailList = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<EmailList, 'name'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly name: string;
  readonly emailRecipients: AsyncCollection<EmailRecipientLists>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmailList = LazyLoading extends LazyLoadingDisabled ? EagerEmailList : LazyEmailList

export declare const EmailList: (new (init: ModelInit<EmailList>) => EmailList) & {
  copyOf(source: EmailList, mutator: (draft: MutableModel<EmailList>) => MutableModel<EmailList> | void): EmailList;
}

type EagerEmailRecipient = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<EmailRecipient, 'email'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly email: string;
  readonly emailLists?: EmailRecipientLists[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmailRecipient = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<EmailRecipient, 'email'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly email: string;
  readonly emailLists: AsyncCollection<EmailRecipientLists>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmailRecipient = LazyLoading extends LazyLoadingDisabled ? EagerEmailRecipient : LazyEmailRecipient

export declare const EmailRecipient: (new (init: ModelInit<EmailRecipient>) => EmailRecipient) & {
  copyOf(source: EmailRecipient, mutator: (draft: MutableModel<EmailRecipient>) => MutableModel<EmailRecipient> | void): EmailRecipient;
}

type EagerEmailRecipientLists = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailRecipientLists, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly emailListName?: string | null;
  readonly emailRecipientEmail?: string | null;
  readonly emailList: EmailList;
  readonly emailRecipient: EmailRecipient;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmailRecipientLists = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmailRecipientLists, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly emailListName?: string | null;
  readonly emailRecipientEmail?: string | null;
  readonly emailList: AsyncItem<EmailList>;
  readonly emailRecipient: AsyncItem<EmailRecipient>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmailRecipientLists = LazyLoading extends LazyLoadingDisabled ? EagerEmailRecipientLists : LazyEmailRecipientLists

export declare const EmailRecipientLists: (new (init: ModelInit<EmailRecipientLists>) => EmailRecipientLists) & {
  copyOf(source: EmailRecipientLists, mutator: (draft: MutableModel<EmailRecipientLists>) => MutableModel<EmailRecipientLists> | void): EmailRecipientLists;
}