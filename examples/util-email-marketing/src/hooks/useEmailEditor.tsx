import { useState } from "react";
import { EmailEditor, ValidationError, ValidationErrors, ValidationField } from "../components/email/EmailEditor";
import {
  validateField,
} from "../ui-components/utils";

export const useEmailEditor = (initialContent: string) => {
  const [content, setContent] = useState(initialContent);
  const [emailPreviewText, setEmailPreviewText] =
    useState("Email Preview Text");
  const [emailHtml, setEmailHtml] = useState("");
  const [emailText, setEmailText] = useState("");
  const [logoUrl, setLogoUrl] = useState("https://picsum.photos/id/63/300/200");
  const [unsubscribeUrl, setUnsubscribeUrl] = useState("http://localhost:3000/api/unsubscribe/{{campaignId}}/{{encodedEmail}}");
  const [address, setAddress] = useState("742 Evergreen Terr., Springfield, Oregon, USA");
  const [logoLinkUrl, setLogoLinkUrl] = useState("https://picsum.photos/id/63/300/200");

  
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validations: Record<ValidationField, { type: string }[]>  = {
    emailPreviewText: [{ type: "Required" }],
    logoUrl: [{ type: "Required" }],
    logoLinkUrl: [{ type: "Required" }],
    unsubscribeUrl: [{ type: "Required" }],
    address: [{ type: "Required" }],
    emailBodyContent: [{ type: "Required" }],
  };

  const runValidationTasks = async (
    fieldName: ValidationField,
    currentValue: string,
    getDisplayValue: (value: string) => string = (value) => value
  ) => {
    console.log("runValidationTasks", { fieldName, currentValue });
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    console.log("runValidationTasks", { validationResponse });
    const updatedErrors = { ...errors, [fieldName]: validationResponse };
    setErrors(updatedErrors);
    return validationResponse;
  };

  const runAllValidationTasks = async () => {
    const emailPreviewTextValidationResponse = await runValidationTasks(
      "emailPreviewText",
      emailPreviewText
    );
    const logoUrlValidationResponse = await runValidationTasks(
      "logoUrl",
      logoUrl
    );
    const logoLinkUrlValidationResponse = await runValidationTasks(
      "logoLinkUrl",
      logoLinkUrl
    );
    const unsubscribeUrlValidationResponse = await runValidationTasks(
      "unsubscribeUrl",
      unsubscribeUrl
    );
    const addressValidationResponse = await runValidationTasks(
      "address",
      address
    );
    return [
      emailPreviewTextValidationResponse,
      logoUrlValidationResponse,
      logoLinkUrlValidationResponse,
      unsubscribeUrlValidationResponse,
      addressValidationResponse,
    ]
  }

  const layout = (
    <EmailEditor
      content={content}
      setContent={setContent}
      emailPreviewText={emailPreviewText}
      setEmailPreviewText={setEmailPreviewText}
      setEmailHtml={setEmailHtml}
      setEmailText={setEmailText}
      logoUrl={logoUrl}
      setLogoUrl={setLogoUrl}
      unsubscribeUrl={unsubscribeUrl}
      setUnsubscribeUrl={setUnsubscribeUrl}
      address={address}
      setAddress={setAddress}
      logoLinkUrl={logoLinkUrl}
      setLogoLinkUrl={setLogoLinkUrl}
      errors={errors}
      setErrors={setErrors}
      runValidationTasks={runValidationTasks}
    />
  );

  console.log("useEmailEditor", { layout, content, emailHtml, errors });

  return { layout, content, emailHtml, setContent, errors, runAllValidationTasks };
};
