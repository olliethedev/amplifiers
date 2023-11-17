import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailTemplateProps } from "./EmailTemplateProps";

export const StripeLikeTemplate = ({
  children,
  previewText,
  logoUrl,
  address,
  unsubscribeUrl,
  logoLinkUrl,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Link href={logoLinkUrl}>
            <Img src={logoUrl} width="auto" height="21" alt="Logo" />
          </Link>
          <Hr style={hr} />
          {children}
          <Hr style={hr} />
          <Text style={footer}>{address}</Text>
          <Link style={{
            ...footer,
            ...anchor
          }} href={unsubscribeUrl}>Unsubscribe</Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StripeLikeTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
