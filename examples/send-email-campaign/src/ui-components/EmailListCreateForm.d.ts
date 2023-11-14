/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmailRecipient } from "../models";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EmailListCreateFormInputValues = {
    name?: string;
    emailRecipients?: EmailRecipient[];
};
export declare type EmailListCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    emailRecipients?: ValidationFunction<EmailRecipient>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailListCreateFormOverridesProps = {
    EmailListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    emailRecipients?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailListCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailListCreateFormInputValues) => EmailListCreateFormInputValues;
    onSuccess?: (fields: EmailListCreateFormInputValues) => void;
    onError?: (fields: EmailListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailListCreateFormInputValues) => EmailListCreateFormInputValues;
    onValidate?: EmailListCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailListCreateForm(props: EmailListCreateFormProps): React.ReactElement;
