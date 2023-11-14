/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmailRecipient, EmailList } from "../models";
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
export declare type EmailRecipientUpdateFormInputValues = {
    email?: string;
    emailLists?: EmailList[];
};
export declare type EmailRecipientUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    emailLists?: ValidationFunction<EmailList>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailRecipientUpdateFormOverridesProps = {
    EmailRecipientUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    emailLists?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailRecipientUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmailRecipientUpdateFormOverridesProps | undefined | null;
} & {
    email?: string;
    emailRecipient?: EmailRecipient;
    onSubmit?: (fields: EmailRecipientUpdateFormInputValues) => EmailRecipientUpdateFormInputValues;
    onSuccess?: (fields: EmailRecipientUpdateFormInputValues) => void;
    onError?: (fields: EmailRecipientUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailRecipientUpdateFormInputValues) => EmailRecipientUpdateFormInputValues;
    onValidate?: EmailRecipientUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmailRecipientUpdateForm(props: EmailRecipientUpdateFormProps): React.ReactElement;
