export type ProcessorAction = { type: "resize", name: string, width: number, height: number };
export type DirectiveArgs = {
    actions: ProcessorAction[];
    bucket: string;
}