/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, Text } from "@aws-amplify/ui-react";
export default function RecipientDataRow(props) {
  const { recipient, tagContainer, overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="row"
      width="100%"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="16px 0px 16px 0px"
      {...getOverrideProps(overrides, "RecipientDataRow")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="600"
        color="rgba(13,26,38,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="300px"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={recipient?.email}
        {...getOverrideProps(overrides, "label")}
      ></Text>
      <Flex
        gap="4px"
        direction="row"
        width="unset"
        height={50}
        justifyContent="flex-start"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children={tagContainer}
        {...getOverrideProps(overrides, "TagContainer")}
      ></Flex>
      <Button
        width="unset"
        height="unset"
        shrink="0"
        size="small"
        isDisabled={false}
        variation="link"
        children="Edit"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}
