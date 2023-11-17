/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { EmailCampaign } from "../models";
import { getOverrideProps, useDataStoreBinding } from "./utils";
import CampaignCard from "./CampaignCard";
import { Collection } from "@aws-amplify/ui-react";
export default function CampaignCardCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: EmailCampaign,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    setItems(itemsDataStore);
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="grid"
      isSearchable={true}
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={9}
      templateColumns="1fr 1fr 1fr"
      autoFlow="row"
      alignItems="stretch"
      justifyContent="stretch"
      items={items || []}
      {...getOverrideProps(overrides, "CampaignCardCollection")}
      {...rest}
    >
      {(item, index) => (
        <CampaignCard
          campaign={item}
          height="auto"
          width="auto"
          margin="4px 4px 4px 4px"
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></CampaignCard>
      )}
    </Collection>
  );
}
