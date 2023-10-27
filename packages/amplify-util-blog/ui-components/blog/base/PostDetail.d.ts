/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Post } from "../../../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, HeadingProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostDetailOverridesProps = {
    PostDetail?: PrimitiveOverrideProps<FlexProps>;
    Body?: PrimitiveOverrideProps<FlexProps>;
    ImageContainer?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<FlexProps>;
    Headline?: PrimitiveOverrideProps<FlexProps>;
    Heading?: PrimitiveOverrideProps<HeadingProps>;
    Tags?: PrimitiveOverrideProps<FlexProps>;
    DateText?: PrimitiveOverrideProps<TextProps>;
    MarkdownContainer?: PrimitiveOverrideProps<FlexProps>;
} & EscapeHatchProps;
export declare type PostDetailProps = React.PropsWithChildren<Partial<FlexProps> & {
    post?: Post;
    imageContainer?: React.ReactNode;
} & {
    overrides?: PostDetailOverridesProps | undefined | null;
}>;
export default function PostDetail(props: PostDetailProps): React.ReactElement;
