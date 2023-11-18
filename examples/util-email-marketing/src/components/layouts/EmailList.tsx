'use client'
import EmalListDataRowCollection from '@/src/ui-components/EmalListDataRowCollection'
import { Button, Flex } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const EmailList = () => {
  const router = useRouter()
  return (
    <Flex direction="column">
      <Button width="fit-content" onClick={() => {
            router.push('/marketing/email-list/new')
        }}>Create Email List</Button>
      <EmalListDataRowCollection/>
    </Flex>
  )
}
