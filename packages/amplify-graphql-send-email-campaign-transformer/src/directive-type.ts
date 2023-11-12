export interface FieldList {
    include?: [string];
    exclude?: [string];
  }
export interface SendEmailCampaignDirectiveArgs {
    fields?: FieldList;
    settings?: string;
  }