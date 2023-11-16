"use client";
import { PageWrapper } from "@/src/components/PageWrapper";
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
                { label: "Campaigns", value: "Campaigns", content: "Tab content #1" },
                { label: "Lists", value: "Lists", content: "Tab content #2" },
                { label: "Emails", value: "Emails", content: "Tab content #3" },
              ]}
            />
          )}
        </Authenticator>
      </Card>
    </PageWrapper>
  );
};
