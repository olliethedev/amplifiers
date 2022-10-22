import {
    Schema,
    GraphQLScalarType,
    ModelFieldType,
    NonModelFieldType,
    isEnumFieldType,
    isNonModelFieldType,
    isModelFieldType,
    isGraphQLScalarType,
    ModelFields,
    ModelField,
} from "@aws-amplify/datastore";

// import { Logger } from "@aws-amplify/core";
import { ElementPropsValues, FormSchemaItem } from "../stories/SchemaForm";
// const logger = new Logger("FormHelper");

export type InputTypeProps =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "time"
  | "datetime-local"
  | "number"
  | "email"
  | "text"
  | "url"
  | "tel"
  | "file";


type EnumFieldType = {
    enum: string;
};

const TYPE_MAP = {
    [GraphQLScalarType[GraphQLScalarType.ID]]: "text",
    [GraphQLScalarType[GraphQLScalarType.String]]: "text",
    [GraphQLScalarType[GraphQLScalarType.Int]]: "number",
    [GraphQLScalarType[GraphQLScalarType.Float]]: "number",
    [GraphQLScalarType[GraphQLScalarType.Boolean]]: "checkbox",
    [GraphQLScalarType[GraphQLScalarType.AWSDate]]: "date",
    [GraphQLScalarType[GraphQLScalarType.AWSTime]]: "time",
    [GraphQLScalarType[GraphQLScalarType.AWSDateTime]]: "datetime-local",
    [GraphQLScalarType[GraphQLScalarType.AWSTimestamp]]: "number",
    [GraphQLScalarType[GraphQLScalarType.AWSEmail]]: "email",
    [GraphQLScalarType[GraphQLScalarType.AWSJSON]]: "text",
    [GraphQLScalarType[GraphQLScalarType.AWSURL]]: "url",
    [GraphQLScalarType[GraphQLScalarType.AWSPhone]]: "tel",
    [GraphQLScalarType[GraphQLScalarType.AWSIPAddress]]: "text",
} as Record<keyof typeof GraphQLScalarType, FormFieldType>;

export declare type FormFieldType =
    | InputTypeProps
    | NonModelFieldType
    | EnumFieldType
    | ModelFieldType;

export const modelToFormSchemaItem = (
    fieldSelection: ModelFields,
    appSchema: Schema,
    overrides?: Record<string, Partial<FormSchemaItem>>,
    dataModel?: Readonly<
        {
            id: string;
        } & Record<string, any>
        >,
    propValueProvider?: (field: ModelField) => ElementPropsValues | undefined,
): FormSchemaItem[] => {
    // logger.info({ schemaFields: Object.keys(fieldSelection) });
    return Object.keys(fieldSelection)
        .filter(
            (key) =>
                fieldSelection[key] !== undefined && (isGraphQLScalarType(fieldSelection[key].type) ||
                    isEnumFieldType(fieldSelection[key].type)) || isModelFieldType(fieldSelection[key].type)
        )
        .map((key) => {
            const field = fieldSelection[key];
            const isPrimitive = isGraphQLScalarType(field.type);
            return {
                name: field.name,
                label: toCapitalizedWords(field.name),
                defaultValue: dataModel?.[field.name],
                elementType: isPrimitive ? "input" : "select",
                isArray: field.isArray,
                elementProps: propsForType(appSchema, field, propValueProvider),
                ...(overrides?.[field.name] ?? {})
            };
        });
};

const propsForType = (appSchema: Schema, field: ModelField, propValueProvider?: (field: ModelField) => ElementPropsValues | undefined) => {
    const isEnum = isEnumFieldType(field.type);
    const isModel = isModelFieldType(field.type);
    let values: ElementPropsValues | undefined = undefined;
    if (isEnum) {
        values = appSchema.enums[(field.type as EnumFieldType).enum].values.map(
            (enumValue: string) => {
                return {
                    name: enumValue,
                    value: enumValue,
                };
            }
        )
    } else if (isModel) {
        values = propValueProvider?.(field);
    }
    return {
        placeholder: `Enter your ${ toCapitalizedWords(field.name).toLowerCase() }`,
        type: (isFieldNonScalarType(field.type)
            ? "text"
            : TYPE_MAP[field.type]) as string,
        values
    }
}

const isFieldNonScalarType = (
    field: any
): field is NonModelFieldType | EnumFieldType | ModelFieldType => {
    return (
        isNonModelFieldType(field) ||
        isEnumFieldType(field) ||
        isModelFieldType(field)
    );
};

export const toCapitalizedWords = (name: string) => {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];

    return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
}
