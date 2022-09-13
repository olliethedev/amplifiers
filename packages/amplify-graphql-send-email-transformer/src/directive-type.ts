export type TemplateInput = { sender: string; recipient:string; subject: string; bodyHtml: string; bodyText: string; };
export type DirectiveArgs = {
    template: TemplateInput;
    trigger: "INSERT" | "MODIFY" | "REMOVE" ;
}