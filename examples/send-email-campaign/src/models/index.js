// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EmailCampaign, EmailList, EmailRecipient, EmailRecipientLists } = initSchema(schema);

export {
  EmailCampaign,
  EmailList,
  EmailRecipient,
  EmailRecipientLists
};