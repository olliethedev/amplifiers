import React from "react";
import { useRouter } from "next/navigation"; //todo: refactor
import { Flex, Heading } from "@aws-amplify/ui-react";
import { default as PostCreateForm  } from "./base/PostCreateForm";
import { default as TagCreateForm } from "./base/TagCreateForm";

 const NewPostLayout = () => {
  const { push } = useRouter();
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
              width: "100%"
            }
          }}
          onSuccess={ () => {
            push("/");
          }}
        />
      </Flex>
    </>
  );
}

export default NewPostLayout;
