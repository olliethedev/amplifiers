/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { EmailList } from "../models";
import { getOverrideProps, useDataStoreBinding } from "./utils";
import EmalListDataRow from "./EmalListDataRow";
import { Collection } from "@aws-amplify/ui-react";
export default function EmalListDataRowCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: EmailList,
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
      searchPlaceholder="Search..."
      itemsPerPage={10}
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "EmalListDataRowCollection")}
      {...rest}
    >
      {(item, index) => (
        <EmalListDataRow
          emailList={item}
          margin="2px 0 2px 0"
          key={item.name}
          {...(overrideItems && overrideItems({ item, index }))}
        ></EmalListDataRow>
      )}
    </Collection>
  );
}
