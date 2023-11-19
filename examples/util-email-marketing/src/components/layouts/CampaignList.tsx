"use client";
import { EmailListsEmailCampaignsByEmailListNameQueryVariables } from "@/src/API";
import { EmailCampaign, EmailListsEmailCampaigns } from "@/src/models";
import CampaignCardCollection from "@/src/ui-components/CampaignCardCollection";
import TagCollection from "@/src/ui-components/TagCollection";
import { Button, Flex, Loader } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import React from "react";

export const CampaignList = () => {
  const router = useRouter();
  return (
    <Flex direction="column">
      <Button
        width="fit-content"
        onClick={() => {
          router.push("/marketing/campaign/new");
        }}
      >
        Create Campaign
      </Button>
      <CampaignCardCollection overrideItems={({
          item,
          index,
        }: {
          item: EmailCampaign;
          index: number;
        }) => ({
          tagPlaceholder: <CampaignEmailLists campaign={item} />,
        })}/>
    </Flex>
  );
};

const CampaignEmailLists = ({ campaign }: { campaign: EmailCampaign }) => {
  const [emailLists, setEmailLists] =
    React.useState<EmailListsEmailCampaigns[]>();
  React.useEffect(() => {
    const call = async () => {
      if (campaign) {
        const emailLists = await campaign.emailLists.toArray();
        setEmailLists(emailLists);
      }
    };
    call();
  }, [campaign]);
  return emailLists ? (
    <TagCollection
      items={emailLists.map((emailList) => {
        return {
          name: emailList.emailListName,
        };
      })}
    />
  ) : (
    <Loader size="small" />
  );
};
