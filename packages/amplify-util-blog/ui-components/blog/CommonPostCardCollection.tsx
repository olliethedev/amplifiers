/* eslint-disable */

import React from "react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { default as PostCardCollection } from "./base/PostCardCollection";
import { default as WrappedBadgeElementCollection } from "./WrappedBadgeElementCollection";
import { Post } from "./../../models";
import { Image } from "@aws-amplify/ui-react";

interface CommonPostCardCollectionProps {
  posts?: Post[];
}

const CommonPostCardCollection = ({ posts }: CommonPostCardCollectionProps) => {
  return (
    <PostCardCollection
      items={posts}
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
          ImageContainer: {
            padding: 0,
            borderRadius: "10px",
            children: item.image.startsWith("http") ? (
              <Image
                src={item.image}
                alt="post image"
                objectFit="cover"
                width="200px"
                height="auto"
              />
            ) : (
              <StorageImage
                imgKey={item.image}
                accessLevel="public"
                alt="post image"
                width={200}
              />
            ),
          },
        },
      })}
    />
  );
};

export default CommonPostCardCollection;
