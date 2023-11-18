/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Flex, SearchField, SelectField } from "@aws-amplify/ui-react";
export default function Filters(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="flex-end"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Filters")}
      {...rest}
    >
      <SearchField
        width="300px"
        height="unset"
        shrink="0"
        label="Label"
        placeholder="Placeholder"
        size="small"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "SearchField")}
      ></SearchField>
      <SelectField
        width="240px"
        height="unset"
        label="List"
        placeholder="All"
        shrink="0"
        size="small"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "SelectField")}
      ></SelectField>
      <Button
        width="unset"
        height="unset"
        shrink="0"
        size="small"
        isDisabled={false}
        variation="default"
        children="Clear"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}
