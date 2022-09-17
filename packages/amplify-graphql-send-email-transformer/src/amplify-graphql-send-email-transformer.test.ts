import { ConflictHandlerType, GraphQLTransform } from '@aws-amplify/graphql-transformer-core';
import { ModelTransformer } from '@aws-amplify/graphql-model-transformer';
import {
  expect as cdkExpect, haveResource,
} from '@aws-cdk/assert';
import { ModelResourceIDs } from "graphql-transformer-common";
import { parse } from 'graphql';
import { Transformer } from './amplify-graphql-send-email-transformer';


test('Send Email Transformer validation happy case', () => {
  const validSchema = `
  type Todo
  @model
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
      sender: "no-reply@eventhost.io",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}`;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  const out = transformer.transform(validSchema);
  expect(out).toBeDefined();
  parse(out.schema);
  expect(out.schema).toMatchSnapshot();
});

test('Not creating CreateModel Transformer without @model', () => {
  const invalidSchema = `
  type Todo
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
      sender: "no-reply@eventhost.io",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}
      `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  expect(() => transformer.transform(invalidSchema)).toThrowError();
});

test('Not creating sendModel Transformer without template parameter', () => {
  const invalidSchema = `
  type Todo
  @model
  @sendEmail() {
  id: ID!
  name: String!
  email: String!
  description: String!
}
      `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  expect(() => transformer.transform(invalidSchema)).toThrowError();
});

test('Not creating sendEmail Transformer without valid template contents ', () => {
  const invalidSchema = `
  type Todo
  @model
  @sendEmail(
    trigger: "INVALID"
    template: {
      subject: ""
      bodyHtml: ""
      bodyText: ""
      sender: ""
      recipient: ""
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}
      `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  expect(() => transformer.transform(invalidSchema)).toThrowError();
});

test('Not creating CreateModel Transformer without valid trigger ', () => {
  const invalidSchema = `
      type Post @model @createModel(trigger:"postAuth" fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
          id: ID!
          title: String!
          createdAt: String
          updatedAt: String
      }
      `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  expect(() => transformer.transform(invalidSchema)).toThrowError();
});


test('CreateModel transformer with datastore enabled vtl', () => {
  const validSchema = `
  type Todo
  @model
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
      sender: "no-reply@eventhost.io",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}
    `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
    resolverConfig: {
      project: {
        ConflictHandler: ConflictHandlerType.AUTOMERGE,
        ConflictDetection: 'VERSION',
      },
    },
  });

  const out = transformer.transform(validSchema);
  expect(parse(out.schema)).toBeDefined();
});

test('CreateModel transformer with multiple model with directives', () => {
  const validSchema = `
  type Todo
  @model
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
      sender: "no-reply@eventhost.io",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}

type Comment
@model
@sendEmail(
  trigger: "INSERT"
  template: {
    subject: "Welcome to Amplify"
    bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
    bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
    sender: "no-reply@eventhost.io",
    recipient: "{{email}}"
  }
) {
id: ID!
name: String!
email: String!
description: String!
}
    `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  const out = transformer.transform(validSchema);
  expect(out).toBeDefined();
  expect(out.schema).toBeDefined();
  expect(out.schema).toMatchSnapshot();
});

test('it generates expected resources', () => {
  const validSchema = `
  type Todo
  @model
  @sendEmail(
    trigger: "INSERT"
    template: {
      subject: "Welcome to Amplify"
      bodyHtml: "<body><h1>Hello, {{name}}! Welcome to Amplify!</h1><p style='font-size:18px'>Message here</p></body>"
      bodyText: "Hello, {{name}}! Welcome to Amplify!Message here"
      sender: "no-reply@eventhost.io",
      recipient: "{{email}}"
    }
  ) {
  id: ID!
  name: String!
  email: String!
  description: String!
}
 `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  const out = transformer.transform(validSchema);
  expect(out).toBeDefined();
  const stack = out.stacks.SendEmailTransformer;
  cdkExpect(stack).to(
    haveResource('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
    }),
  );
  cdkExpect(stack).to(
    haveResource('AWS::Lambda::Function'),
  );
});

