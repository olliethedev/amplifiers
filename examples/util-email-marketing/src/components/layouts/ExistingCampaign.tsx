
import React, { useEffect } from 'react'
import { DataStore } from "aws-amplify/datastore";
import { EmailCampaign } from '@/src/models';

export const ExistingCampaign = ({ slug }: { slug: string }) => {
  const [campaign, setCampaign] = React.useState<EmailCampaign>();
  useEffect(() => {
    const call = async () => {
      const campaign = await DataStore.query(EmailCampaign, slug);
      setCampaign(campaign);
    };
    call();
  }, []);
  return (
    <div>CampaignDetails: {campaign?.name}</div>
  )
}