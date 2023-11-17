'use client'
import { PageWrapper } from '@/src/components/PageWrapper'
import EmailCampaignCreateForm, { EmailCampaignCreateFormInputValues } from '@/src/components/forms/EmailCampaignCreateForm'
import { useModal } from '@/src/hooks/useModal'
import { Button, Heading, TextField } from '@aws-amplify/ui-react'
import React, { useCallback, useState } from 'react'
import { generateClient } from 'aws-amplify/api';
import * as mutations from '@/src/graphql/mutations';
import { SendEmailsMutationVariables } from '@/src/API'

const client = generateClient();

export default function CreateCampaign() {
  const {Modal, toggleModal} = useModal();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [payload, setPayload] = useState<EmailCampaignCreateFormInputValues>({});
  const onSendTest = useCallback(() => {
    const call = async () => {
    console.log('sending test')
    console.log({payload});
    const sendEmailDetails: SendEmailsMutationVariables = {
      recipients: recipients,
      subject: 'Test Email',
      body: '<p>This is a <b>test</b> email</p>',
      sender: 'no-reply@amplifyui.com',
      bodyText: 'This is a test email',
    };
    
    const sendEmailsResponse = await client.graphql({
      query: mutations.sendEmails,
      variables: sendEmailDetails
    });
    toggleModal();
    console.log(sendEmailsResponse);
    }
    call();
  }, []);
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
