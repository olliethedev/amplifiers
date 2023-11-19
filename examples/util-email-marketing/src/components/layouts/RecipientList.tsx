"use client";
import {
  EmailList,
  EmailRecipient,
  EmailRecipientsEmailLists,
  LazyEmailList,
} from "@/src/models";
import Filters from "@/src/ui-components/Filters";
import RecipientDataRowCollection from "@/src/ui-components/RecipientDataRowCollection";
import TagCollection from "@/src/ui-components/TagCollection";
import { Button, Flex, Loader } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import React from "react";

export const RecipientList = () => {
  const router = useRouter();
  return (
    <Flex direction="column">
      <Button
        width="fit-content"
        onClick={() => {
          router.push("/marketing/email-recipient/new");
        }}
      >
        Add Email Recipient
      </Button>
      <Filters />
      <RecipientDataRowCollection
        overrideItems={({
          item,
          index,
        }: {
          item: EmailRecipient;
          index: number;
        }) => ({
          tagContainer: <RecipientEmailLists recipient={item} />,
          overrides:{
            Button:{
              onClick: () => {
                router.push(`/marketing/email-recipient/${item.email}`);
              },
            }
          }
        })}
      />
    </Flex>
  );
};

const RecipientEmailLists = ({ recipient }: { recipient: EmailRecipient }) => {
  const [emailLists, setEmailLists] =
    React.useState<EmailRecipientsEmailLists[]>();
  React.useEffect(() => {
    const call = async () => {
      if (recipient) {
        const emailLists = await recipient.emailLists.toArray();
        setEmailLists(emailLists);
      }
    };
    call();
  }, [recipient]);
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
