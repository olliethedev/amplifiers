/* eslint-disable */

import React from "react";
import { Flex, Heading } from "@aws-amplify/ui-react";
import { PostCreateFormInputValues } from "./base/PostCreateForm";
import { default as PostCreateForm } from "./base/PostCreateForm";
import { default as TagCreateForm } from "./base/TagCreateForm";

interface CreatePostLayoutProps {
  onSuccess: (fields: PostCreateFormInputValues) => void;
}

const NewPostLayout = ({ onSuccess }: CreatePostLayoutProps) => {
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
        <Heading level={2}>Create a New Post</Heading>
        <PostCreateForm
          overrides={{
            PostCreateForm: {
              width: "100%",
            },
          }}
          onSuccess={onSuccess}
        />
      </Flex>
    </>
  );
};

export default NewPostLayout;
