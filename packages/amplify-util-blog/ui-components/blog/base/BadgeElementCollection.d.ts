/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BadgeElementProps } from "./BadgeElement";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BadgeElementCollectionOverridesProps = {
    BadgeElementCollection?: PrimitiveOverrideProps<CollectionProps>;
    BadgeElement?: BadgeElementProps;
} & EscapeHatchProps;
export declare type BadgeElementCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => BadgeElementProps;
} & {
    overrides?: BadgeElementCollectionOverridesProps | undefined | null;
}>;
export default function BadgeElementCollection(props: BadgeElementCollectionProps): React.ReactElement;
