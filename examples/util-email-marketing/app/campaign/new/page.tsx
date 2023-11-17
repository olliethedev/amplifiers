'use client'
import { PageWrapper } from '@/src/components/PageWrapper'
import EmailCampaignCreateForm from '@/src/components/forms/EmailCampaignCreateForm'
import { Heading } from '@aws-amplify/ui-react'
import React from 'react'

export default function CreateCampaign() {
  return (
    <PageWrapper>
        <Heading level={1}>Create Campaign</Heading>
        <EmailCampaignCreateForm/>
    </PageWrapper>
  )
}
