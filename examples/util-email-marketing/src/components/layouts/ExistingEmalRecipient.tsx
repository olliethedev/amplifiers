"use client"
import React from 'react'
import EmailRecipientUpdateForm from '../forms/EmailRecipientUpdateForm'

interface ExistingEmailRecipientProps {
    email: string
}

export const ExistingEmailRecipient = ({email}:ExistingEmailRecipientProps) => {
  return (
    <EmailRecipientUpdateForm email={email}  />
  )
}
