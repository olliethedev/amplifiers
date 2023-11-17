/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EmailCampaign } from "../models";
import { ButtonProps, DividerProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CampaignCardOverridesProps = {
    CampaignCard?: PrimitiveOverrideProps<FlexProps>;
    "Frame 417"?: PrimitiveOverrideProps<FlexProps>;
    "Product Title"?: PrimitiveOverrideProps<FlexProps>;
    CampaignTitle?: PrimitiveOverrideProps<TextProps>;
    Status?: PrimitiveOverrideProps<TextProps>;
    Date?: PrimitiveOverrideProps<TextProps>;
    TagContainer?: PrimitiveOverrideProps<FlexProps>;
    Divider?: PrimitiveOverrideProps<DividerProps>;
    "Frame 1"?: PrimitiveOverrideProps<FlexProps>;
    SendButton?: PrimitiveOverrideProps<ButtonProps>;
    ViewButton?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type CampaignCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    campaign?: EmailCampaign;
    tagPlaceholder?: React.ReactNode;
} & {
    overrides?: CampaignCardOverridesProps | undefined | null;
}>;
export default function CampaignCard(props: CampaignCardProps): React.ReactElement;
