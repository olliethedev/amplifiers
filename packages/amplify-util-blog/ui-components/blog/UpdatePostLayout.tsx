/* eslint-disable */

import React from "react";
import { Button, Flex, Heading } from "@aws-amplify/ui-react";

import { default as PostUpdateForm } from "./base/PostUpdateForm";
import { default as TagCreateForm } from "./base/TagCreateForm";
import { PostUpdateFormInputValues } from "./base/PostUpdateForm";
import { Post } from "./../../models";
import { useModal } from "./base/useModal";

interface UpdatePostLayoutProps {
  post: Post;
  onSuccess: (fields: PostUpdateFormInputValues) => void;
}

const UpdatePostLayout = ({ post, onSuccess }: UpdatePostLayoutProps) => {
  const { Modal, toggleModal } = useModal();
  return (
    <>
      <Flex
        direction="column"
        marginTop="xl"
        marginBottom="xl"
        alignItems="center"
        width="100%"
      >
        <Heading level={2}>Update Post</Heading>

        <Flex width="100%" paddingLeft="20px" paddingRight="20px">
          <Button onClick={toggleModal}>Create a New Tag</Button>
        </Flex>
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
      <Modal title="Create a New Tag">
        <TagCreateForm onSuccess={() => toggleModal()} />
      </Modal>
    </>
  );
};

export default UpdatePostLayout;
