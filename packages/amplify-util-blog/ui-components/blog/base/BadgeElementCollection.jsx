/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Tag } from "../../../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import BadgeElement from "./BadgeElement";
import { Collection } from "@aws-amplify/ui-react";
export default function BadgeElementCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Tag,
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
      direction="row"
      searchPlaceholder="Search..."
      gap="3px"
      wrap="nowrap"
      items={items || []}
      {...getOverrideProps(overrides, "BadgeElementCollection")}
      {...rest}
    >
      {(item, index) => (
        <BadgeElement
          tag={item}
          key={item.name}
          {...(overrideItems && overrideItems({ item, index }))}
        ></BadgeElement>
      )}
    </Collection>
  );
}
