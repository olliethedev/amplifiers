export interface EmailTemplateProps {
    children: React.ReactNode;
    previewText: string;
    logoUrl: string;
    logoLinkUrl: string;
    address: string;
    unsubscribeUrl: string;
}