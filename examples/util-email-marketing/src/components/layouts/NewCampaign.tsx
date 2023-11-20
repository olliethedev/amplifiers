"use client";
import React, { useCallback, useState } from "react";
import { Button, Flex, Heading, Icon, Text, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { PageWrapper } from "../PageWrapper";
import EmailCampaignCreateForm, {
  EmailCampaignCreateFormInputValues, EmailCampaignCreateFormInputValuesExtraData,
} from "../forms/EmailCampaignCreateForm";
import { useModal } from "../../hooks/useModal";
import * as mutations from "../../graphql/mutations";
import { SendEmailsMutationVariables } from "../../API";
import { LazyEmailRecipient } from "../../models";
const client = generateClient();

export const NewCampaign = () => {
  const { Modal: TestModal, toggleModal: toggleTestModal } = useModal();
  const { Modal: CampaignModal, toggleModal: toggleCampaignModal } =
    useModal();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [payload, setPayload] = useState<EmailCampaignCreateFormInputValues>(
    {}
  );
  const [payloadExtra, setPayloadExtra] = useState<EmailCampaignCreateFormInputValuesExtraData>(
    {}
  );

  const onSuccess = useCallback((data: EmailCampaignCreateFormInputValues, extra: EmailCampaignCreateFormInputValuesExtraData) => {
    console.log("onSuccess");
    sendCampaign(data, extra);
  }, []);

  const onSendTest = useCallback(() => {
    sendTestEmail();
  }, [recipients]);

  const sendCampaign = async (data: EmailCampaignCreateFormInputValues, extra: EmailCampaignCreateFormInputValuesExtraData) => {
    console.log("sending campaign");
    console.log({ data });
    const recipientsFromLists: LazyEmailRecipient[] = [];
    for (const list of data.emailLists ?? []) {
      const recipientsFromList = await list.emailRecipients.toArray();
      for (const recipient of recipientsFromList) {
        recipientsFromLists.push(await recipient.emailRecipient);
      }
    }
    const sendEmailDetails: SendEmailsMutationVariables = {
      recipients: recipientsFromLists.map((recipient) => recipient.email),
      subject: data.emailSubject ?? "",
      body: data.emailContent ?? "",
      sender: data.emailSender ?? "",
      bodyText: extra.emailText ?? "",
    };
    console.log({ sendEmailDetails });
    const sendEmailsResponse = await client.graphql({
      query: mutations.sendEmails,
      variables: sendEmailDetails,
    });
    toggleCampaignModal();
    console.log(sendEmailsResponse);
  };

  const sendTestEmail = async () => {
    console.log("sending test");
    console.log({ payload, payloadExtra });
    const sendEmailDetails: SendEmailsMutationVariables = {
      recipients: recipients,
      subject: payload.emailSubject
        ? `Test: ${payload.emailSubject}`
        : "Test email",
      body: payload.emailContent ?? "",
      sender: payload.emailSender ?? "",
      bodyText: payloadExtra.emailText ?? "",
    };
    console.log({ sendEmailDetails });
    const sendEmailsResponse = await client.graphql({
      query: mutations.sendEmails,
      variables: sendEmailDetails,
    });
    toggleTestModal();
    console.log(sendEmailsResponse);
  };

  return (
    <PageWrapper>
      <Heading level={1}>Create Campaign</Heading>
      <EmailCampaignCreateForm
        onTest={(fields, extra) => {
          setPayload(fields);
          setPayloadExtra(extra);
          toggleTestModal();
        }}
        onSuccess={onSuccess}
        clearOnSuccess={false}
      />
      <TestModal title="Test Campaign">
        <Flex direction="column" gap="small" justifyContent="center">
        <Heading level={3}>Test</Heading>
        <TextField
          label="Recipients"
          value={recipients.join(", ")}
          onChange={(e) => setRecipients(e.target.value.split(", "))}
        />
        <Button onClick={onSendTest}>Send Test</Button>
        </Flex>
      </TestModal>
      <CampaignModal title="Email Campaign Sent">
        <Flex direction="column" gap="small" alignItems="center">
            <SuccessIcon/>
            <Text variation="info" fontSize="large">Successfully sent campaign</Text>
            <Button
            onClick={() => {
                toggleCampaignModal();
            }}
            >
            Close
            </Button>
        </Flex>
      </CampaignModal>
    </PageWrapper>
  );
};

const SuccessIcon = () => {
    return (<Icon
        ariaLabel="Success"
        name="check"
        width="90px"
        height="90px"
        viewBox={{ minX: 0, minY: 0, width: 507.2, height: 507.2 }}
      >
        <circle fill="#32BA7C" cx="253.6" cy="253.6" r="253.6"></circle>
        <path
          fill="#0AA06E"
          d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"
        ></path>
        <g>
          <path
            fill="#FFFFFF"
            d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
      c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"
          ></path>
          <path
            fill="#FFFFFF"
            d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
      c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"
          ></path>
        </g>
        <path d="M0 11.5L4.5 16 16 4.5 11.5 0 0 11.5z"></path>
      </Icon>)
}
