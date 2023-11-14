// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EmailCampaign, EmailList, EmailRecipient, EmailRecipientsEmailLists } = initSchema(schema);

export {
  EmailCampaign,
  EmailList,
  EmailRecipient,
  EmailRecipientsEmailLists
};