'use client'
import React, { useCallback, useState } from 'react'
import { Button, Heading, TextField } from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/api';
import { PageWrapper } from '../PageWrapper'
import EmailCampaignCreateForm, { EmailCampaignCreateFormInputValues } from '../forms/EmailCampaignCreateForm'
import { useModal } from '../../hooks/useModal'
import * as mutations from '../../graphql/mutations';
import { SendEmailsMutationVariables } from '../../API'
const client = generateClient();

export const NewCampaign = () => {
    const {Modal, toggleModal} = useModal();
    const [recipients, setRecipients] = useState<string[]>([]);
    const [payload, setPayload] = useState<EmailCampaignCreateFormInputValues>({});
    //todo implement onSuccess
    const onSendTest = useCallback(() => {
      const call = async () => {
      console.log('sending test')
      console.log({payload});
      const sendEmailDetails: SendEmailsMutationVariables = {
        recipients: recipients,
        subject: 'Test Email',
        body: payload.emailContent??'',
        sender: 'no-reply@amplifyui.com',
        bodyText: 'This is a test email',
      };
      console.log({sendEmailDetails});
      const sendEmailsResponse = await client.graphql({
        query: mutations.sendEmails,
        variables: sendEmailDetails
      });
      toggleModal();
      console.log(sendEmailsResponse);
      }
      call();
    }, [recipients]);
    return (
      <PageWrapper>
          <Heading level={1}>Create Campaign</Heading>
          <EmailCampaignCreateForm onTest={(fields)=>{
            setPayload(fields);
            toggleModal();
          }}/>
          <Modal title='Test Campaign'>
            <Heading level={3}>Test</Heading>
            <TextField label='Recipients' value={recipients.join(', ')} onChange={e => setRecipients(e.target.value.split(', '))}/>
            <Button onClick={onSendTest}>Send Test</Button>
          </Modal>
      </PageWrapper>
    )
}
