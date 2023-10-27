/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Badge, Flex } from "@aws-amplify/ui-react";
export default function BadgeElement(props) {
  const { tag, overrides, ...rest } = props;
  const badgeElementOnClick = useNavigateAction({
    type: "url",
    url: `${"/tag/"}${tag?.name}`,
  });
  return (
    <Flex
      gap="0"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      padding="0px 0px 0px 0px"
      onClick={() => {
        badgeElementOnClick();
      }}
      {...getOverrideProps(overrides, "BadgeElement")}
      {...rest}
    >
      <Badge
        width="unset"
        height="unset"
        shrink="0"
        size="default"
        variation="default"
        children={tag?.name}
        {...getOverrideProps(overrides, "Badge")}
      ></Badge>
    </Flex>
  );
}
