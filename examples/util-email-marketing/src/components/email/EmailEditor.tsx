import {
  Accordion,
  Flex,
  Label,
  SelectField,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import React, { useEffect } from "react";
import { Markdown } from "@react-email/markdown";
import { renderAsync } from "@react-email/components";
import { StripeLikeTemplate } from "./templates/StripeLike";
import { DropboxLikeTemplate } from "./templates/DropboxLike";
import { GoogleLikeTemplate } from "./templates/GoogleLike";


interface EmailEditorProps {
  content: string;
  setContent: (content: string) => void;
  emailPreviewText: string;
  setEmailPreviewText: (text: string) => void;
  setEmailHtml: (html: string) => void;
  setEmailText: (text: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  unsubscribeUrl: string;
  setUnsubscribeUrl: (url: string) => void;
  address: string;
  setAddress: (address: string) => void;
  logoLinkUrl: string;
  setLogoLinkUrl: (url: string) => void;
  errors: ValidationErrors;
  setErrors: (errors: ValidationErrors) => void;
  runValidationTasks: (
    fieldName: ValidationField,
    currentValue: string,
    getDisplayValue?: (value: string) => string
  ) => Promise<ValidationError>;
}

export type ValidationField = 'emailPreviewText' | 'logoUrl' | 'logoLinkUrl' | 'unsubscribeUrl' | 'address' | 'emailBodyContent';

export interface ValidationError {
  hasError: boolean;
  errorMessage?: string;
}

export interface ValidationErrors {
  emailPreviewText?: ValidationError;
  logoUrl?: ValidationError;
  logoLinkUrl?: ValidationError;
  unsubscribeUrl?: ValidationError;
  address?: ValidationError;
  emailBodyContent?: ValidationError;
  // Add other fields as needed
}

export const EmailEditor = ({
  content,
  setContent,
  emailPreviewText,
  setEmailPreviewText,
  setEmailHtml,
  setEmailText,
  logoUrl,
  setLogoUrl,
  unsubscribeUrl,
  setUnsubscribeUrl,
  address,
  setAddress,
  logoLinkUrl,
  setLogoLinkUrl,
  errors,
  setErrors,
  runValidationTasks
}: EmailEditorProps) => {
  
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<string>("Simple");

  const getSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "Simple":
        return StripeLikeTemplate;
      case "Fancy":
        return GoogleLikeTemplate;
      case "Basic":
        return DropboxLikeTemplate;
      default:
        return StripeLikeTemplate;
    }
  };

  const SelectedTemplate = getSelectedTemplate();
  return (
    <Flex width="100%">
      <Flex direction="column" grow={1} width="50%" gap="8px">
        <SelectField
          label="Template"
          options={["Simple", "Fancy", "Basic"]}
          onChange={(e) => {
            const { value } = e.target;
            setSelectedTemplate(value);
          }}
        />
        <TextField
          label="Email Preview Text"
          onChange={(e) => {
            let {value} = e.target;
            setEmailPreviewText(value);
            if (errors.emailPreviewText?.hasError) {
              runValidationTasks("emailPreviewText", value);
            }
          }}
          value={emailPreviewText}

          onBlur={() => runValidationTasks("emailPreviewText", emailPreviewText)}
          errorMessage={errors.emailPreviewText?.errorMessage}
          hasError={errors.emailPreviewText?.hasError}
        />
        <TextField
          label="Logo URL"
          onChange={(e) => {
            let {value} = e.target;
            setLogoUrl(value);
            if (errors.logoUrl?.hasError) {
              runValidationTasks("logoUrl", value);
            }
          }}
          value={logoUrl}
          onBlur={() => runValidationTasks("logoUrl", logoUrl)}
          errorMessage={errors.logoUrl?.errorMessage}
          hasError={errors.logoUrl?.hasError}
        />
        <TextField
          label="Logo Link URL"
          onChange={(e) => {
            let {value} = e.target;
            setLogoLinkUrl(value);
            if (errors.logoLinkUrl?.hasError) {
              runValidationTasks("logoLinkUrl", value);
            }
          }}
          value={logoLinkUrl}
          onBlur={() => runValidationTasks("logoLinkUrl", logoLinkUrl)}
          errorMessage={errors.logoLinkUrl?.errorMessage}
          hasError={errors.logoLinkUrl?.hasError}
        />
        <TextAreaField
          label="Email Body Content"
          rows={15}
          onChange={(e) => {
            let {value} = e.target;
            setContent(value);
            if (errors.emailBodyContent?.hasError) {
              runValidationTasks("emailBodyContent", value);
            }
          }}
          value={content}
          onBlur={() => runValidationTasks("emailBodyContent", content)}
          errorMessage={errors.emailBodyContent?.errorMessage}
          hasError={errors.emailBodyContent?.hasError}
        />
        <TextField
          label="Unsubscribe URL"
          onChange={(e) => {
            let {value} = e.target;
            setUnsubscribeUrl(value);
            if (errors.unsubscribeUrl?.hasError) {
              runValidationTasks("unsubscribeUrl", value);
            }
          }}
          value={unsubscribeUrl}
          onBlur={() => runValidationTasks("unsubscribeUrl", unsubscribeUrl)}
          errorMessage={errors.unsubscribeUrl?.errorMessage}
          hasError={errors.unsubscribeUrl?.hasError}
        />
        <TextField
          label="Address"
          onChange={(e) => {
            let {value} = e.target;
            setAddress(value);
            if (errors.address?.hasError) {
              runValidationTasks("address", value);
            }
          }}
          value={address}
          onBlur={() => runValidationTasks("address", address)}
          errorMessage={errors.address?.errorMessage}
          hasError={errors.address?.hasError}
        />
        <View>
          <Accordion
            items={[
              {
                trigger: "Email Template Editor Info",
                value: "info",
                content: (
                  <span>
                    You can use markdown to edit the email template.{" "}
                    <a
                      href="https://www.markdownguide.org/cheat-sheet/"
                      target="_blank"
                    >
                      Markdown Cheetsheet
                    </a>
                    <br />
                    The following variables are available at runtime:
                    <br />
                    <b>{"{{email}}"}</b> : The email address of the recipient.
                    <br />
                    <b>{"{{encodedEmail}}"}</b> : The email address of the
                    recipient encoded for use in a URL. Could be used in
                    unsubscribing links.
                    <br />
                    <b>{"{{campaignId}}"}</b> : The id of the campaign. Could be
                    used in unsubscribing links.
                  </span>
                ),
              },
            ]}
          />
        </View>
      </Flex>
      <Flex direction="column" grow={1} width="50%" gap="8px">
        <Label>Preview</Label>
        <RenderedEmail
          width="100%"
          height="800"
          setEmailHtml={setEmailHtml}
          setEmailText={setEmailText}
        >
          {SelectedTemplate && (
            <SelectedTemplate
              previewText={emailPreviewText}
              logoUrl={logoUrl}
              address={address}
              unsubscribeUrl={unsubscribeUrl}
              logoLinkUrl={logoLinkUrl}
            >
              <Markdown>{content}</Markdown>
            </SelectedTemplate>
          )}
        </RenderedEmail>
      </Flex>
    </Flex>
  );
};

interface RenderedEmailProps
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  children: React.ReactNode;
  setEmailHtml: (html: string) => void;
  setEmailText: (text: string) => void;
}

const RenderedEmail = ({
  children,
  setEmailHtml,
  setEmailText,
  ...iframeProps
}: RenderedEmailProps) => {
  const [content, setContent] = React.useState("");

  useEffect(() => {
    const call = async () => {
      const html = await renderAsync(<>{children}</>);
      const text = await renderAsync(<>{children}</>, {
        plainText: true,
      });
      setContent(html as any);
      setEmailHtml(html as any);
      setEmailText(text as any);
    };
    call();
  }, [children]);

  return <iframe srcDoc={content} {...iframeProps}></iframe>;
};

