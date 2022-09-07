import { ConflictHandlerType, GraphQLTransform } from '@aws-amplify/graphql-transformer-core';
import { ModelTransformer } from '@aws-amplify/graphql-model-transformer';
import {
  expect as cdkExpect, haveResource,
} from '@aws-cdk/assert';
import { ModelResourceIDs } from "graphql-transformer-common";
import { parse } from 'graphql';
import { Transformer } from './amplify-graphql-create-model-transformer';


test('CreateModel Transformer validation happy case', () => {
  const validSchema = `
    type Post @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }
    `;
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
      type Post @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
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

test('Not creating CreateModel Transformer without fieldMap parameter', () => {
  const invalidSchema = `
      type Post @model @createModel {
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

test('Not creating CreateModel Transformer without valid fieldMap list', () => {
  const invalidSchema = `
      type Post @model @createModel(fieldMap:[{cognito:"sub", model:"id"}]) {
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

test('CreateModel transformer vtl', () => {
  const validSchema = `
    type Post @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }
    `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });

  const out = transformer.transform(validSchema);
  expect(parse(out.schema)).toBeDefined();
  expect(out.resolvers).toMatchSnapshot();
});

test('CreateModel transformer with datastore enabled vtl', () => {
  const validSchema = `
    type Post @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
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
    type Post @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }

    type User @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"owner"}]) {
        id: ID!
        name: String!
        owner: String
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
    type Post @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }
    type Todo @model @createModel(fieldMap:[{cognitoField:"sub", modelField:"owner"}]) {
        id: ID!
        name: String!
        description: String
        createdAt: String
        updatedAt: String
        owner: String
    }
    type Comment @model {
      id: ID!
      content: String!
    }
 `;
  const transformer = new GraphQLTransform({
    transformers: [new ModelTransformer(), new Transformer()],
  });
  const out = transformer.transform(validSchema);
  expect(out).toBeDefined();
  const stack = out.stacks.CreateModelTransformer;
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

