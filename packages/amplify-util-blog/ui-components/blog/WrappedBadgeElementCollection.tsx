/* eslint-disable */

import { useEffect, useState } from "react";
import { Post, Tag } from "./../../models";
import { default as BadgeElementCollection } from "./base/BadgeElementCollection";

const WrappedBadgeElementCollection = ({ post }: { post: Post }) => {
    const [postTags, setPostTags] = useState<Tag[]>([]);
  
    useEffect(
      () => {
        const work = async () => {
          const tags = await post.tags.toArray();
          setPostTags(
            tags.map(
              (tag) =>
                ({
                  name: tag.tagName,
                } as Tag)
            )
          );
        };
        work();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
  
    return (
      <BadgeElementCollection
        items={postTags}
        overrideItems={({ item, index }) => ({
          overrides: {
            Badge: {
              style: {
                cursor: "pointer",
              },
            },
          },
        })}
      />
    );
  };

export default WrappedBadgeElementCollection;  
  