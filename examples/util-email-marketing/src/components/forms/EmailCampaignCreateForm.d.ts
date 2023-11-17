/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type EmailCampaignCreateFormInputValues = {
    name?: string;
    emailSubject?: string;
    emailContent?: string;
    emailSender?: string;
    draft?: boolean;
    emailLists?: EmailList[];
};
export declare type EmailCampaignCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    emailSubject?: ValidationFunction<string>;
    emailContent?: ValidationFunction<string>;
    emailSender?: ValidationFunction<string>;
    draft?: ValidationFunction<boolean>;
    emailLists?: ValidationFunction<EmailList>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailCampaignCreateFormOverridesProps = {
    EmailCampaignCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    emailSubject?: PrimitiveOverrideProps<TextFieldProps>;
    emailContent?: PrimitiveOverrideProps<TextFieldProps>;
    emailSender?: PrimitiveOverrideProps<TextFieldProps>;
    draft?: PrimitiveOverrideProps<SwitchFieldProps>;
    emailLists?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailCampaignCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailCampaignCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailCampaignCreateFormInputValues) => EmailCampaignCreateFormInputValues;
    onSuccess?: (fields: EmailCampaignCreateFormInputValues) => void;
    onTest?: (fields: EmailCampaignCreateFormInputValues) => void;
    onError?: (fields: EmailCampaignCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailCampaignCreateFormInputValues) => EmailCampaignCreateFormInputValues;
    onValidate?: EmailCampaignCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailCampaignCreateForm(props: EmailCampaignCreateFormProps): React.ReactElement;
