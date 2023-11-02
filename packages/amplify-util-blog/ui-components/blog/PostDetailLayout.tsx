/* eslint-disable */
import React from "react";

import { StorageImage } from "@aws-amplify/ui-react-storage";
import { Post } from "../../models";
import PostDetail from "../../ui-components/blog/base/PostDetail";
import MemoizedReactMarkdown from "../../ui-components/blog/MemoizedReactMarkdown";
import WrappedBadgeElementCollection from "../../ui-components/blog/WrappedBadgeElementCollection";
import { Image } from "@aws-amplify/ui-react";

interface PostDetailLayoutProps {
  post: Post;
}

const PostDetailLayout = ({ post }: PostDetailLayoutProps) => {
  return (
    <PostDetail
      post={post}
      overrides={{
        PostDetail: {
          backgroundColor: "transparent",
          marginTop: "large",
          marginBottom: "xl",
        },
        Tags: {
          children: <WrappedBadgeElementCollection post={post} />,
        },
        MarkdownContainer: {
          direction: "column",
          marginTop: "small",
          children: (
            <MemoizedReactMarkdown>{post.content}</MemoizedReactMarkdown>
          ),
        },
        ImageContainer: {
          padding: 0,
          borderRadius: "0px",
          maxHeight: "410px",
          justifyContent: "center",
          children: post.image.startsWith("http") ? (
            <Image
              src={post.image}
              alt="post image"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          ) : (
            <StorageImage
              imgKey={post.image}
              accessLevel="public"
              alt="post image"
              width="100%"
            />
          ),
        },
      }}
    />
  );
};

export default PostDetailLayout;
