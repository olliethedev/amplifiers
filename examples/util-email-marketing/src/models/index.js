// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EmailCampaign, EmailList, EmailRecipient, EmailListsEmailCampaigns, EmailRecipientsEmailLists } = initSchema(schema);

export {
  EmailCampaign,
  EmailList,
  EmailRecipient,
  EmailListsEmailCampaigns,
  EmailRecipientsEmailLists
};