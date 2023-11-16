'use client'
import React from "react";
import { PageWrapper } from "@/src/components/PageWrapper";
import { Flex } from "@aws-amplify/ui-react";

export default function Home() {
  return (
    <PageWrapper>
      <Flex direction="column">
      <h1>Email Marketing Example Project</h1>
      <p>
        To see campaign dashboard, click the "Dashboard" button in the top
      </p>
      </Flex>
    </PageWrapper>
  );
}
