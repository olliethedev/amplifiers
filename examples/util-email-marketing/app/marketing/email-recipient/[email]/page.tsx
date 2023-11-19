import React from 'react'
import { ExistingEmailRecipient } from '@/src/components/layouts/ExistingEmalRecipient'

const EmailRecipientDetails = ({ params }: { params: { email: string } }) => {
    const email = decodeURIComponent(params.email)
    return (<ExistingEmailRecipient email={email} />)
}

export default EmailRecipientDetails;