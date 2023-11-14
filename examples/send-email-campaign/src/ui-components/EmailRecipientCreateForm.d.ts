/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmailList } from "../models";
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
export declare type EmailRecipientCreateFormInputValues = {
    email?: string;
    emailLists?: EmailList[];
};
export declare type EmailRecipientCreateFormValidationValues = {
    email?: ValidationFunction<string>;
    emailLists?: ValidationFunction<EmailList>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailRecipientCreateFormOverridesProps = {
    EmailRecipientCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    emailLists?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailRecipientCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailRecipientCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailRecipientCreateFormInputValues) => EmailRecipientCreateFormInputValues;
    onSuccess?: (fields: EmailRecipientCreateFormInputValues) => void;
    onError?: (fields: EmailRecipientCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailRecipientCreateFormInputValues) => EmailRecipientCreateFormInputValues;
    onValidate?: EmailRecipientCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailRecipientCreateForm(props: EmailRecipientCreateFormProps): React.ReactElement;
