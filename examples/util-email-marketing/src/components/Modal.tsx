import React from "react";
import { Button, Flex, Heading, View, Icon, IconProps } from "@aws-amplify/ui-react";

interface Props {
  title?: string;
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ title, open, onClose, children }: Props) => {
  return (
    <Flex
      style={{
        zIndex: 1000,
      }}
      height="100vh"
      width="100vw"
      backgroundColor="rgba(25,22,10, 0.3)"
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      direction="column"
      justifyContent="center"
      alignItems="center"
      overflow={{ base: "auto" }}
      onClick={onClose}
      display={open ? "flex" : "none"}
    >
      <View
        backgroundColor="white"
        borderRadius="20px"
        minWidth="300px"
        padding="20px 25px"
        overflow="auto"
        onClick={(e: any) => {
          // e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="medium"
        >
          <Heading level={3}>{title}</Heading>
          <Button onClick={onClose} borderRadius="20px" width="20px">
            <Close />
          </Button>
        </Flex>
        {children}
      </View>
    </Flex>
  );
};

export default Modal;


const Close = (props: IconProps & { children?: React.ReactNode }) => {
  const { children, ...rest } = props;
  return (
    <Icon
      ariaLabel="Remove"
      viewBox={{ width: 24, height: 24 }}
      paths={[
        {
          d: "M6 18L18 6M6 6l12 12",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          fill: "none",
          stroke: "currentColor",
        },
      ]}
      {...rest}
    >
      {children}
    </Icon>
  );
};
