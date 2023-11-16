/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmailCampaign, EmailList } from "../models";
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
export declare type EmailCampaignUpdateFormInputValues = {
    name?: string;
    emailSubject?: string;
    emailContent?: string;
    emailSender?: string;
    draft?: boolean;
    emailLists?: EmailList[];
};
export declare type EmailCampaignUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    emailSubject?: ValidationFunction<string>;
    emailContent?: ValidationFunction<string>;
    emailSender?: ValidationFunction<string>;
    draft?: ValidationFunction<boolean>;
    emailLists?: ValidationFunction<EmailList>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailCampaignUpdateFormOverridesProps = {
    EmailCampaignUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    emailSubject?: PrimitiveOverrideProps<TextFieldProps>;
    emailContent?: PrimitiveOverrideProps<TextFieldProps>;
    emailSender?: PrimitiveOverrideProps<TextFieldProps>;
    draft?: PrimitiveOverrideProps<SwitchFieldProps>;
    emailLists?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type EmailCampaignUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmailCampaignUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    emailCampaign?: EmailCampaign;
    onSubmit?: (fields: EmailCampaignUpdateFormInputValues) => EmailCampaignUpdateFormInputValues;
    onSuccess?: (fields: EmailCampaignUpdateFormInputValues) => void;
    onError?: (fields: EmailCampaignUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailCampaignUpdateFormInputValues) => EmailCampaignUpdateFormInputValues;
    onValidate?: EmailCampaignUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmailCampaignUpdateForm(props: EmailCampaignUpdateFormProps): React.ReactElement;
