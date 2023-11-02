/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Post } from "../../../models";
import {
  createDataStorePredicate,
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { SortDirection } from "@aws-amplify/datastore";
import PostCard from "./PostCard";
import { Collection } from "@aws-amplify/ui-react";
export default function PostCardCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsFilterObj = { field: "published", operand: true, operator: "eq" };
  const itemsFilter = createDataStorePredicate(itemsFilterObj);
  const itemsPagination = {
    sort: (s) => s.updatedAt(SortDirection.DESCENDING),
  };
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Post,
    criteria: itemsFilter,
    pagination: itemsPagination,
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
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={9}
      templateColumns={{
        base: "repeat(1, 1fr)",
        medium: "repeat(3, 1fr)",
      }}
      autoFlow="row"
      alignItems="stretch"
      justifyContent="stretch"
      items={items || []}
      {...getOverrideProps(overrides, "PostCardCollection")}
      {...rest}
    >
      {(item, index) => (
        <PostCard
          post={item}
          key={item.slug}
          {...(overrideItems && overrideItems({ item, index }))}
        ></PostCard>
      )}
    </Collection>
  );
}
