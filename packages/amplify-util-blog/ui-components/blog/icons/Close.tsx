import { Icon, IconProps } from "@aws-amplify/ui-react";
import React from "react";

export const Close = (props: IconProps & { children?: React.ReactNode }) => {
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