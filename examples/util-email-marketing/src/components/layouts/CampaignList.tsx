'use client'
import CampaignCardCollection from '@/src/ui-components/CampaignCardCollection'
import { Button, Flex } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const CampaignList = () => {
    const router = useRouter()
  return (
    <Flex direction="column">
        <Button width="fit-content" onClick={() => {
            router.push('/marketing/campaign/new')
        }}>Create Campaign</Button>
    <CampaignCardCollection/>
    </Flex>
  )
}
