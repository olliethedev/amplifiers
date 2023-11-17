'use client'
import CampaignCardCollection from '@/src/ui-components/CampaignCardCollection'
import { Button, Flex } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const CampaignList = () => {
    const router = useRouter()
  return (
    <Flex direction="column">
        <Button onClick={() => {
            router.push('/campaign/new')
        }}>Create Campaign</Button>
    <CampaignCardCollection/>
    </Flex>
  )
}
