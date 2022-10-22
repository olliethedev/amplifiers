import { modelToFormSchemaItem, toCapitalizedWords } from "./FormHelper";
import { Schema } from "@aws-amplify/datastore";
const schema: Schema = {
    models: {
        User: {
            name: "User",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                username: {
                    name: "username",
                    isArray: false,
                    type: "String",
                    isRequired: true,
                    attributes: [],
                },
                email: {
                    name: "email",
                    isArray: false,
                    type: "String",
                    isRequired: true,
                    attributes: [],
                },
                userType: {
                    name: "userType",
                    isArray: false,
                    type: {
                        enum: "UserType",
                    },
                    isRequired: false,
                    attributes: [],
                },
                description: {
                    name: "description",
                    isArray: false,
                    type: "String",
                    isRequired: false,
                    attributes: [],
                },
                Tags: {
                    name: "Tags",
                    isArray: true,
                    type: {
                        model: "UserTags",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "user",
                    },
                },
                ProjectsInvited: {
                    name: "ProjectsInvited",
                    isArray: true,
                    type: {
                        model: "VendorsProjects",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "user",
                    },
                },
                Projects: {
                    name: "Projects",
                    isArray: true,
                    type: {
                        model: "Project",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "userID",
                    },
                },
                MessagesReceived: {
                    name: "MessagesReceived",
                    isArray: true,
                    type: {
                        model: "Message",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "senderID",
                    },
                },
                MessagesSent: {
                    name: "MessagesSent",
                    isArray: true,
                    type: {
                        model: "Message",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "recipientID",
                    },
                },
                PaymentsReceived: {
                    name: "PaymentsReceived",
                    isArray: true,
                    type: {
                        model: "Payment",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "recipientID",
                    },
                },
                PaymentsSent: {
                    name: "PaymentsSent",
                    isArray: true,
                    type: {
                        model: "Payment",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "senderID",
                    },
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "Users",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "auth",
                    properties: {
                        rules: [
                            {
                                allow: "public",
                                operations: ["read"],
                            },
                            {
                                provider: "userPools",
                                ownerField: "id",
                                allow: "owner",
                                operations: ["read", "update"],
                                identityClaim: "cognito:username",
                            },
                        ],
                    },
                },
            ],
        },
        Tag: {
            name: "Tag",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                label: {
                    name: "label",
                    isArray: false,
                    type: "String",
                    isRequired: true,
                    attributes: [],
                },
                Users: {
                    name: "Users",
                    isArray: true,
                    type: {
                        model: "UserTags",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "tag",
                    },
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "Tags",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "auth",
                    properties: {
                        rules: [
                            {
                                allow: "public",
                                operations: ["read"],
                            },
                        ],
                    },
                },
            ],
        },
        Project: {
            name: "Project",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                name: {
                    name: "name",
                    isArray: false,
                    type: "String",
                    isRequired: true,
                    attributes: [],
                },
                description: {
                    name: "description",
                    isArray: false,
                    type: "String",
                    isRequired: false,
                    attributes: [],
                },
                userID: {
                    name: "userID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                projectViewers: {
                    name: "projectViewers",
                    isArray: true,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                    isArrayNullable: true,
                },
                Messages: {
                    name: "Messages",
                    isArray: true,
                    type: {
                        model: "Message",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "projectID",
                    },
                },
                Payments: {
                    name: "Payments",
                    isArray: true,
                    type: {
                        model: "Payment",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "projectID",
                    },
                },
                VendorsAdded: {
                    name: "VendorsAdded",
                    isArray: true,
                    type: {
                        model: "VendorsProjects",
                    },
                    isRequired: false,
                    attributes: [],
                    isArrayNullable: true,
                    association: {
                        connectionType: "HAS_MANY",
                        associatedWith: "project",
                    },
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "Projects",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "key",
                    properties: {
                        name: "byUser",
                        fields: ["userID"],
                    },
                },
                {
                    type: "auth",
                    properties: {
                        rules: [
                            {
                                provider: "userPools",
                                ownerField: "owner",
                                allow: "owner",
                                operations: ["create", "read", "update"],
                                identityClaim: "cognito:username",
                            },
                        ],
                    },
                },
            ],
        },
        Message: {
            name: "Message",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                senderID: {
                    name: "senderID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                recipientID: {
                    name: "recipientID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                projectID: {
                    name: "projectID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                content: {
                    name: "content",
                    isArray: false,
                    type: "String",
                    isRequired: true,
                    attributes: [],
                },
                contentVersion: {
                    name: "contentVersion",
                    isArray: false,
                    type: {
                        enum: "MessageContentVersion",
                    },
                    isRequired: true,
                    attributes: [],
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "Messages",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "key",
                    properties: {
                        name: "byMessageSender",
                        fields: ["senderID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byMessageRecipient",
                        fields: ["recipientID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byProject",
                        fields: ["projectID"],
                    },
                },
                {
                    type: "auth",
                    properties: {
                        rules: [
                            {
                                provider: "userPools",
                                ownerField: "senderID",
                                allow: "owner",
                                operations: ["read", "create"],
                                identityClaim: "cognito:username",
                            },
                            {
                                provider: "userPools",
                                ownerField: "recipientID",
                                allow: "owner",
                                operations: ["read"],
                                identityClaim: "cognito:username",
                            },
                        ],
                    },
                },
            ],
        },
        Payment: {
            name: "Payment",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                amount: {
                    name: "amount",
                    isArray: false,
                    type: "Float",
                    isRequired: false,
                    attributes: [],
                },
                projectID: {
                    name: "projectID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                senderID: {
                    name: "senderID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                recipientID: {
                    name: "recipientID",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                status: {
                    name: "status",
                    isArray: false,
                    type: {
                        enum: "PaymentStatus",
                    },
                    isRequired: true,
                    attributes: [],
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "Payments",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "key",
                    properties: {
                        name: "byProject",
                        fields: ["projectID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byPaymentSender",
                        fields: ["senderID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byPaymentRecipient",
                        fields: ["recipientID"],
                    },
                },
                {
                    type: "auth",
                    properties: {
                        rules: [
                            {
                                provider: "userPools",
                                ownerField: "senderID",
                                allow: "owner",
                                operations: ["read", "create"],
                                identityClaim: "cognito:username",
                            },
                            {
                                provider: "userPools",
                                ownerField: "recipientID",
                                allow: "owner",
                                operations: ["read"],
                                identityClaim: "cognito:username",
                            },
                        ],
                    },
                },
            ],
        },
        UserTags: {
            name: "UserTags",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                user: {
                    name: "user",
                    isArray: false,
                    type: {
                        model: "User",
                    },
                    isRequired: true,
                    attributes: [],
                    association: {
                        connectionType: "BELONGS_TO",
                        targetName: "userID",
                    },
                },
                tag: {
                    name: "tag",
                    isArray: false,
                    type: {
                        model: "Tag",
                    },
                    isRequired: true,
                    attributes: [],
                    association: {
                        connectionType: "BELONGS_TO",
                        targetName: "tagID",
                    },
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "UserTags",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "key",
                    properties: {
                        name: "byUser",
                        fields: ["userID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byTag",
                        fields: ["tagID"],
                    },
                },
            ],
        },
        VendorsProjects: {
            name: "VendorsProjects",
            fields: {
                id: {
                    name: "id",
                    isArray: false,
                    type: "ID",
                    isRequired: true,
                    attributes: [],
                },
                user: {
                    name: "user",
                    isArray: false,
                    type: {
                        model: "User",
                    },
                    isRequired: true,
                    attributes: [],
                    association: {
                        connectionType: "BELONGS_TO",
                        targetName: "userID",
                    },
                },
                project: {
                    name: "project",
                    isArray: false,
                    type: {
                        model: "Project",
                    },
                    isRequired: true,
                    attributes: [],
                    association: {
                        connectionType: "BELONGS_TO",
                        targetName: "projectID",
                    },
                },
                createdAt: {
                    name: "createdAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
                updatedAt: {
                    name: "updatedAt",
                    isArray: false,
                    type: "AWSDateTime",
                    isRequired: false,
                    attributes: [],
                    isReadOnly: true,
                },
            },
            syncable: true,
            pluralName: "VendorsProjects",
            attributes: [
                {
                    type: "model",
                    properties: {},
                },
                {
                    type: "key",
                    properties: {
                        name: "byUser",
                        fields: ["userID"],
                    },
                },
                {
                    type: "key",
                    properties: {
                        name: "byProject",
                        fields: ["projectID"],
                    },
                },
            ],
        },
    },
    enums: {
        UserType: {
            name: "UserType",
            values: ["VENDOR", "VENUE", "SPEAKER", "MANAGER"],
        },
        MessageContentVersion: {
            name: "MessageContentVersion",
            values: ["V1"],
        },
        PaymentStatus: {
            name: "PaymentStatus",
            values: ["PENDING", "PAID", "REJECTED"],
        },
    },
    nonModels: {},
    version: "766166f05a1499c8f7137127427393a3",
};
const model = {
    name: "User",
    id: "007",
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2020-01-01T00:00:00.000Z",
};
describe("Form Helper", () => {
    it("should create correct schema length", () => {
        expect(
            modelToFormSchemaItem(
                { firstName: schema.models.User.fields.email },
                schema,
                undefined,
                model
            )
        ).toHaveLength(1);
    });
    it("should have array of values", () => {
        expect(
            modelToFormSchemaItem(
                { firstName: schema.models.User.fields.userType },

                schema,
                undefined,
                model
            )[0].elementProps.values
        ).toEqual(
            ["VENDOR", "VENUE", "SPEAKER", "MANAGER"].map((v) => ({
                name: v,
                value: v,
            }))
        );
    });
    it("should have correct overrides", () => {
        expect(
            modelToFormSchemaItem(
                { firstName: schema.models.User.fields.userType },
                schema,
                {
                    userType: {
                        name: "Test",
                    },
                    model,
                }
            )[0]
        ).toHaveProperty("name", "Test");
    });
    it("should have correct prop values for model type", () => {
        const mockData = [{
            name: "Test",
            value: "Test",
        }]
        expect(
            modelToFormSchemaItem(
                { Tags: schema.models.User.fields.Tags },
                schema,
                undefined,
                model,
                (field) => mockData
            )[0]
        ).toHaveProperty("elementProps.values", mockData);
    });
    it("should have no prop values for model type", () => {
        expect(
            modelToFormSchemaItem(
                { Tags: schema.models.User.fields.Tags },
                schema,
                undefined,
                model,
                undefined
            )[0]
        ).toHaveProperty("elementProps.values", undefined);
    });
    it("should capitalize from camelcase", () => {
        expect(toCapitalizedWords("oneTwoThree")).toEqual("One Two Three");
    });
    it("should not capitalize from camelcase", () => {
        expect(toCapitalizedWords("")).toEqual("");
    });
});
