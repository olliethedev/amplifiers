/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PageOverridesProps = {
    Page?: PrimitiveOverrideProps<FlexProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2"?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type PageProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: PageOverridesProps | undefined | null;
}>;
export default function Page(props: PageProps): React.ReactElement;
