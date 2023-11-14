/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmailList, EmailRecipient } from "../models";
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
export declare type EmailListUpdateFormInputValues = {
    name?: string;
    emailRecipients?: EmailRecipient[];
};
export declare type EmailListUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    emailRecipients?: ValidationFunction<EmailRecipient>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailListUpdateFormOverridesProps = {
    EmailListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    emailRecipients?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailListUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmailListUpdateFormOverridesProps | undefined | null;
} & {
    name?: string;
    emailList?: EmailList;
    onSubmit?: (fields: EmailListUpdateFormInputValues) => EmailListUpdateFormInputValues;
    onSuccess?: (fields: EmailListUpdateFormInputValues) => void;
    onError?: (fields: EmailListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailListUpdateFormInputValues) => EmailListUpdateFormInputValues;
    onValidate?: EmailListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmailListUpdateForm(props: EmailListUpdateFormProps): React.ReactElement;
