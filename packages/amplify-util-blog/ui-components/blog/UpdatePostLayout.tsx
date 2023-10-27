/* eslint-disable */

import React from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";

import { default as PostUpdateForm } from "./base/PostUpdateForm";
import { default as TagCreateForm } from "./base/TagCreateForm";
import { PostUpdateFormInputValues } from "./base/PostUpdateForm";
import { Post } from "./../../models";

interface UpdatePostLayoutProps {
  post: Post;
  onSuccess: (fields: PostUpdateFormInputValues) => void;
}

const UpdatePostLayout = ({ post, onSuccess }: UpdatePostLayoutProps) => {

  return (
    <>
      <Flex direction="column" gap="2rem" alignItems="center" width="100%">
        <Heading level={2}>Create a New Tag</Heading>
        <TagCreateForm
          overrides={{
            TagCreateForm: {
              width: "100%",
            },
          }}
        />
        <Heading level={2}>Update Post</Heading>
        <PostUpdateForm
          overrides={{
            PostUpdateForm: {
              width: "100%",
            },
          }}
          onSuccess={onSuccess}
          post={post as Post}
        />
      </Flex>
    </>
  );
};

export default UpdatePostLayout;
