import Filters from '@/src/ui-components/Filters'
import RecipientDataRowCollection from '@/src/ui-components/RecipientDataRowCollection'
import { Flex } from '@aws-amplify/ui-react'
import React from 'react'

export const RecipientList = () => {
  return (
    <Flex direction="column">
        <Filters/>
        <RecipientDataRowCollection/>
    </Flex>
  )
}
