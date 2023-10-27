/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TagCreateFormInputValues = {
    name?: string;
};
export declare type TagCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TagCreateFormOverridesProps = {
    TagCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TagCreateFormProps = React.PropsWithChildren<{
    overrides?: TagCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TagCreateFormInputValues) => TagCreateFormInputValues;
    onSuccess?: (fields: TagCreateFormInputValues) => void;
    onError?: (fields: TagCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TagCreateFormInputValues) => TagCreateFormInputValues;
    onValidate?: TagCreateFormValidationValues;
} & React.CSSProperties>;
export default function TagCreateForm(props: TagCreateFormProps): React.ReactElement;
