/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Tag } from "../../../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BadgeProps, FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BadgeElementOverridesProps = {
    BadgeElement?: PrimitiveOverrideProps<FlexProps>;
    Badge?: PrimitiveOverrideProps<BadgeProps>;
} & EscapeHatchProps;
export declare type BadgeElementProps = React.PropsWithChildren<Partial<FlexProps> & {
    tag?: Tag;
} & {
    overrides?: BadgeElementOverridesProps | undefined | null;
}>;
export default function BadgeElement(props: BadgeElementProps): React.ReactElement;
