'use client'
import React from 'react'
import { ExistingCampaign } from '@/src/components/layouts/ExistingCampaign';

const CampaignDetails = ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params.slug)
  
  return (
    <ExistingCampaign slug={slug} />
  )
}

export default CampaignDetails;
