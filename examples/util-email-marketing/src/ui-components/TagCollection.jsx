/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { EmailList } from "../models";
import { getOverrideProps, useDataStoreBinding } from "./utils";
import Tag from "./Tag";
import { Collection } from "@aws-amplify/ui-react";
export default function TagCollection(props) {
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
      direction="row"
      alignItems="stretch"
      items={items || []}
      {...getOverrideProps(overrides, "TagCollection")}
      {...rest}
    >
      {(item, index) => (
        <Tag
          emailList={item}
          width="auto"
          margin="0 2px 0 2px"
          key={item.name}
          {...(overrideItems && overrideItems({ item, index }))}
        ></Tag>
      )}
    </Collection>
  );
}
