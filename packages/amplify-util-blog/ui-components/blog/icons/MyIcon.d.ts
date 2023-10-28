/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyIconOverridesProps = {
    MyIcon?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type MyIconProps = React.PropsWithChildren<Partial<IconProps> & {
    type?: "alert" | "arrow-right" | "authentication" | "bookmark_border" | "chat" | "chat-bubble-outline" | "checkmark" | "close" | "content" | "dashboard" | "data" | "delete" | "edit" | "email" | "favorite" | "favorite_border" | "file" | "function" | "group" | "home" | "info" | "instagram" | "location" | "more_horiz" | "more_vert" | "notification" | "phone" | "reply" | "send" | "settings" | "share" | "shopping_bag" | "shuffle" | "storage" | "twitter" | "warning";
} & {
    overrides?: MyIconOverridesProps | undefined | null;
}>;
export default function MyIcon(props: MyIconProps): React.ReactElement;
