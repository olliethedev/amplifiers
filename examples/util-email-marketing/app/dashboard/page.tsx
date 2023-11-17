"use client";
import { PageWrapper } from "@/src/components/PageWrapper";
import { CampaignList } from "@/src/components/layouts/CampaignList";
import { EmailList } from "@/src/components/layouts/EmailList";
import { RecipientList } from "@/src/components/layouts/RecipientList";
import { Authenticator, Card, Tabs } from "@aws-amplify/ui-react";
import React from "react";

export default () => {
  return (
    <PageWrapper>
      <Card>
        <Authenticator>
          {({ signOut, user }) => (
            <Tabs
              justifyContent="flex-start"
              defaultValue="Campaigns"
              items={[
                { label: "Campaigns", value: "Campaigns", content: <CampaignList/> },
                { label: "Lists", value: "Lists", content: <EmailList/> },
                { label: "Emails", value: "Emails", content: <RecipientList/> },
              ]}
            />
          )}
        </Authenticator>
      </Card>
    </PageWrapper>
  );
};
