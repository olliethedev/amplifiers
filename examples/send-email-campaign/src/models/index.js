// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EmailCampaign, EmailList, EmailRecipient, EmailCampaignLists, EmailRecipientLists } = initSchema(schema);

export {
  EmailCampaign,
  EmailList,
  EmailRecipient,
  EmailCampaignLists,
  EmailRecipientLists
};