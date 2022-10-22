import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import SchemaForm from './SchemaForm';

import * as z from "zod";
import { fileSchema } from '../utils/ValidationHelper';
import { Schema } from '@aws-amplify/datastore';

const gqlSchema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "userType": {
                    "name": "userType",
                    "isArray": false,
                    "type": {
                        "enum": "UserType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "isProfilePrivate": {
                    "name": "isProfilePrivate",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "picture": {
                    "name": "picture",
                    "isArray": false,
                    "type": "AWSURL",
                    "isRequired": false,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "Tags": {
                    "name": "Tags",
                    "isArray": true,
                    "type": {
                        "model": "ServiceTags"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "service"
                    }
                },
                "socialMedia": {
                    "name": "socialMedia",
                    "isArray": true,
                    "type": "AWSURL",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "id",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "Tag": {
            "name": "Tag",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "label": {
                    "name": "label",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "Users": {
                    "name": "Users",
                    "isArray": true,
                    "type": {
                        "model": "UserTags"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "tag"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Tags",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update",
                                    "delete"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
    },
    "enums": {
        "UserType": {
            "name": "UserType",
            "values": [
                "VENDOR",
                "VENUE",
                "SPEAKER",
                "MANAGER"
            ]
        },
        "RichTextVersion": {
            "name": "RichTextVersion",
            "values": [
                "V1"
            ]
        }
    },
    "nonModels": {},
    "version": "a2a1c9b7625e97692a2f75ed422ec7f9"
} as Schema;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SchemaForm',
  component: SchemaForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof SchemaForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SchemaForm> = (args) => <SchemaForm {...args} />;

export const SimpleSchemaForm = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const user= {
    "id": "1",
    picture: "https://blog.olliecodes.com/img/8fefb8bf-17bd-4930-a0da-95e469816dc1.webp",
    email: "example@example.com",
}
const tags = [
    {
        "id": "1",
        "label": "tag1",
    },
    {
        "id": "2",
        "label": "tag2",
    },
    {
        "id": "3",
        "label": "tag3",
    },
]
const { email, isProfilePrivate, firstName, lastName, picture, description, userType, socialMedia, Tags } = gqlSchema.models.User.fields;
const zodSchema = z.object({
        firstName: z
          .string({ required_error: "Please enter your first name" })
          .min(1)
          .nullable(),
        lastName: z
          .string({ required_error: "Please enter your last name" })
          .min(1)
          .nullable(),
        picture: fileSchema(user.picture),
      })
      .required();
SimpleSchemaForm.args = {
    gqlSchema: gqlSchema,
    fieldSelection:{
        email,
        isProfilePrivate,
        firstName,
        lastName,
        userType,
        picture,
        description,
        socialMedia,
        Tags
      },
      dataModel:{ user } as any,
      overrides:{
        email: {
          elementType: "input",
          defaultValue: user.email,
          elementProps: {
            disabled: true,
          },
        },
        isProfilePrivate: {
            elementType: "input",
            defaultValue: "true",
        },
        description: {
          elementType: "textarea",
        },
        picture: {
          name: "picture",
          label: "Picture",
          elementType: "input",
          elementProps: {
            placeholder: "Picture",
            type: "file",
          },
          defaultValue: user.picture,
        },
        Tags: {
            isArray: false,
            elementType: "combobox",
            tooltip:
                "Search and select categories that best describe your service",
            label: "Categories",
            defaultValue: [{ name: "New", value: "0" }],
            elementProps: {
                placeholder: "Search for categories",
                values: tags.map((tag) => ({ name: tag.label, value: tag.id })),
            },
        },
      },
      validationSchema:zodSchema
};

