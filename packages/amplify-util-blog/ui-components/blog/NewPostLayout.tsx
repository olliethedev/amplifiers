/* eslint-disable */

import React from "react";
import { Button, Flex, Heading } from "@aws-amplify/ui-react";
import { PostCreateFormInputValues } from "./base/PostCreateForm";
import { default as PostCreateForm } from "./base/PostCreateForm";
import { default as TagCreateForm } from "./base/TagCreateForm";
import { useModal } from "./base/useModal";

interface CreatePostLayoutProps {
  onSuccess: (fields: PostCreateFormInputValues) => void;
}

const NewPostLayout = ({ onSuccess }: CreatePostLayoutProps) => {
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
        <Heading level={2}>Create a New Post</Heading>

        <Flex width="100%" paddingLeft="20px" paddingRight="20px">
          <Button onClick={toggleModal}>Create a New Tag</Button>
        </Flex>
        <PostCreateForm
          overrides={{
            PostCreateForm: {
              width: "100%",
            },
          }}
          onSuccess={onSuccess}
        />
      </Flex>
      <Modal title="Create a New Tag">
        <TagCreateForm onSuccess={() => toggleModal()} />
      </Modal>
    </>
  );
};

export default NewPostLayout;
