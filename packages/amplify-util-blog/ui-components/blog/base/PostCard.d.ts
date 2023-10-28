/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Post } from "../../../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
import { MyIconProps } from "../icons/MyIcon";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCardOverridesProps = {
    PostCard?: PrimitiveOverrideProps<FlexProps>;
    Body?: PrimitiveOverrideProps<FlexProps>;
    ImageContainer?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<FlexProps>;
    Headline?: PrimitiveOverrideProps<FlexProps>;
    HeadlineText?: PrimitiveOverrideProps<TextProps>;
    Tags?: PrimitiveOverrideProps<FlexProps>;
    DateText?: PrimitiveOverrideProps<TextProps>;
    Article?: PrimitiveOverrideProps<FlexProps>;
    ArticleText?: PrimitiveOverrideProps<TextProps>;
    ReadMoreLayout?: PrimitiveOverrideProps<FlexProps>;
    MyIcon?: MyIconProps;
    ReadMoreText?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type PostCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    post?: Post;
    imageContainer?: React.ReactNode;
} & {
    overrides?: PostCardOverridesProps | undefined | null;
}>;
export default function PostCard(props: PostCardProps): React.ReactElement;
