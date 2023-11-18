'use client'
import React from 'react'
import { Authenticator, Card, Tabs } from "@aws-amplify/ui-react";
import { PageWrapper } from "../PageWrapper";
import { CampaignList } from "./CampaignList";
import { EmailList } from "./EmailList";
import { RecipientList } from "./RecipientList";

export const DashboardContent = () => {
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
  )
}
