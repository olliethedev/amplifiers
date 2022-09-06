import { ConflictHandlerType, GraphQLTransform } from '@aws-amplify/graphql-transformer-core';
import { ModelTransformer } from '@aws-amplify/graphql-model-transformer';
import {
  anything, countResources, expect as cdkExpect, haveResource, ResourcePart,
} from '@aws-cdk/assert';
import { parse } from 'graphql';
import { Transformer } from './amplify-graphql-create-model-post-confirmation-transformer';


test('CreateModel Transformer validation happy case', () => {
  const validSchema = `
    type Post @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
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

test('Not CreateModel Transformer without @model', () => {
    const invalidSchema = `
      type Post @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
          id: ID!
          title: String!
          createdAt: String
          updatedAt: String
      }
      `;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(()=>transformer.transform(invalidSchema)).toThrowError();
  });

test('CreateModel transformer vtl', () => {
  const validSchema = `
    type Post @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
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
    type Post @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
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
    type Post @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }

    type User @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"owner"}]) {
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
    type Post @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"id"}]) {
        id: ID!
        title: String!
        createdAt: String
        updatedAt: String
    }
    type Todo @model @createModelPostConfirmation(fieldMap:[{cognitoField:"sub", modelField:"owner"}]) {
        id: ID!
        name: String!
        description: String
        createdAt: String
        updatedAt: String
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
  const stack = out.stacks.CreatePostConfirmation;
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
  console.log(JSON.stringify(stack, null, 2));
  cdkExpect(stack).to(
    haveResource('AWS::Lambda::Function'),
  );
});

