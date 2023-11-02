/* eslint-disable */

import React from "react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import {
  default as PostCardCollection,
  PostCardCollectionProps,
} from "./base/PostCardCollection";
import { default as WrappedBadgeElementCollection } from "./WrappedBadgeElementCollection";
import { Post } from "./../../models";
import { Image } from "@aws-amplify/ui-react";

declare type CommonPostCardCollectionProps = {
  posts?: Post[];
} & PostCardCollectionProps;

const CommonPostCardCollection = ({
  posts,
  ...rest
}: CommonPostCardCollectionProps) => {
  return (
    <PostCardCollection
      items={posts}
      {...rest}
      overrideItems={({ item, index }) => ({
        overrides: {
          Tags: {
            children: <WrappedBadgeElementCollection post={item as Post} />,
          },
          ReadMoreLayout: {
            style: {
              cursor: "pointer",
            },
          },
          ImageLayout: {
            width: "100%",
            height: "250px",
          },
          ImageContainer: {
            padding: 0,
            justifyContent: "center",
            maxWidth: "100%",
            maxHeight: "250px",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            children: item.image.startsWith("http") ? (
              <Image
                src={item.image}
                alt="post image"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            ) : (
              <StorageImage
                imgKey={item.image}
                accessLevel="public"
                alt="post image"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            ),
          },
        },
      })}
    />
  );
};

export default CommonPostCardCollection;
