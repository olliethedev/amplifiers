/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PostCardProps } from "./PostCard";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCardCollectionOverridesProps = {
    PostCardCollection?: PrimitiveOverrideProps<CollectionProps>;
    PostCard?: PostCardProps;
} & EscapeHatchProps;
export declare type PostCardCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => PostCardProps;
} & {
    overrides?: PostCardCollectionOverridesProps | undefined | null;
}>;
export default function PostCardCollection(props: PostCardCollectionProps): React.ReactElement;
