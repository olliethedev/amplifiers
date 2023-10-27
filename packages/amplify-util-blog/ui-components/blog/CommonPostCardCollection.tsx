import React from "react";
import Image from "next/image";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { default as PostCardCollection } from "./base/PostCardCollection";
import { default as WrappedBadgeElementCollection } from "./WrappedBadgeElementCollection";
import { Post } from "./../../models";

interface CommonPostCardCollectionProps {
  posts?: Post[];
}

const CommonPostCardCollection = ({
  posts,
}: CommonPostCardCollectionProps) => {
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
            children: item.image.startsWith('http') ? (
              <Image 
              src={item.image} 
              alt="post image" 
              width={0}
              height={0}
              sizes="200px"
              style={{ width: 'auto', height: '100%' }}/>
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
