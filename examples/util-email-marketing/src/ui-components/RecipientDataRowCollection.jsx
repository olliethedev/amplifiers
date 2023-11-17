/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { EmailRecipient } from "../models";
import { getOverrideProps, useDataStoreBinding } from "./utils";
import RecipientDataRow from "./RecipientDataRow";
import { Collection } from "@aws-amplify/ui-react";
export default function RecipientDataRowCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: EmailRecipient,
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
      type="list"
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "RecipientDataRowCollection")}
      {...rest}
    >
      {(item, index) => (
        <RecipientDataRow
          recipient={item}
          margin="2px 0 2px 0"
          key={item.email}
          {...(overrideItems && overrideItems({ item, index }))}
        ></RecipientDataRow>
      )}
    </Collection>
  );
}
