"use client";
import {
  EmailList,
  EmailRecipient,
  EmailRecipientsEmailLists,
  LazyEmailList,
  LazyEmailRecipientsEmailLists
} from "@/src/models";
import Filters from "@/src/ui-components/Filters";
import RecipientDataRowCollection from "@/src/ui-components/RecipientDataRowCollection";
import TagCollection from "@/src/ui-components/TagCollection";
import { Button, Flex, Loader } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchFilter } from "../SearchFilter";
import { generateClient } from 'aws-amplify/api';
import {ModelInstanceCreator} from 'aws-amplify/datastore'
import { listEmailRecipients, listEmailRecipientsEmailLists } from "@/src/graphql/queries";
import { ListEmailRecipientsEmailListsQueryVariables } from "@/src/API";

const client = generateClient();

export const RecipientList = () => {
  const router = useRouter();
  const [emailRecipients, setEmailRecipients] = useState<EmailRecipient[]>();
  const [filters, setFilters] = useState<{ name: string; emailList: string }>();
  useEffect(() => {
    const call = async () => {
      const variables: ListEmailRecipientsEmailListsQueryVariables = {
        filter: {emailRecipientEmail: {beginsWith: filters?.name}}
      }
      const emailRecipients = await client.graphql({
        query: listEmailRecipientsEmailLists,
        variables
      });
      console.log({emailRecipients});
      
      setEmailRecipients( emailRecipients.data.listEmailRecipientsEmailLists.items.map((item) => new EmailRecipient({
        email: item.emailRecipientEmail,
        emailLists: [],
      })) );
    };
    call();
  },[filters]);
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
      {/* <SearchFilter onChange={(name, list)=>{
        setFilters({name, emailList: list});
      }} /> */}
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
