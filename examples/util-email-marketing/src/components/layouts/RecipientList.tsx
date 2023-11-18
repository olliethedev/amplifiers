'use client'
import Filters from '@/src/ui-components/Filters'
import RecipientDataRowCollection from '@/src/ui-components/RecipientDataRowCollection'
import { Button, Flex } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const RecipientList = () => {
  const router = useRouter()
  return (
    <Flex direction="column">
      <Button width="fit-content" onClick={() => {
            router.push('/marketing/email-recipient/new')
        }}>Add Email Recipient</Button>
        <Filters/>
        <RecipientDataRowCollection/>
    </Flex>
  )
}
