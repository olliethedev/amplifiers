import {
  Body,
  Container,
  Head,
  Html,
  Hr,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailTemplateProps } from "./EmailTemplateProps";

export const DropboxLikeTemplate = ({
  children,
  previewText,
  logoUrl,
  address,
  unsubscribeUrl,
  logoLinkUrl,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Link href={logoLinkUrl}>
            <Img
              src={logoUrl}
              width="auto"
              height="50"
              alt="Logo"
              style={logo}
            />
          </Link>
          {children}
          <Hr style={hr} />
          <Text style={footer}>{address}</Text>
          <Link href={unsubscribeUrl}>Unsubscribe</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default DropboxLikeTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
