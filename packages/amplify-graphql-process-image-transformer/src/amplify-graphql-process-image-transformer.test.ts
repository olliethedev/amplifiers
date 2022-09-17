import {  GraphQLTransform } from '@aws-amplify/graphql-transformer-core';
import { ModelTransformer } from '@aws-amplify/graphql-model-transformer';
import { parse } from 'graphql';
import { Transformer } from './amplify-graphql-process-image-transformer';


test('Process Image Transformer validation happy case', () => {
    const validSchema = `
    type Todo
    @model {
    id: ID!
    picture: AWSURL @processImage(
        bucket: "appimagestoreage113252-dev"
        actions: [{type:"resize", name:"thumbnail",  width:100, height:100},
        {name:"medium", type:"resize", width:500, height:500}]
      )
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    const out = transformer.transform(validSchema);
    expect(out).toBeDefined();
    parse(out.schema);
    expect(out.schema).toMatchSnapshot();
  });

  test('Not creating Process Image Transformer without @model', () => {
    const invalidSchema = `
    type Todo {
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{type:"resize", name:"thumbnail",  width:100, height:100},
            {name:"medium", type:"resize", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without AWSURL!', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: String! @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{type:"resize", name:"thumbnail",  width:100, height:100},
            {name:"medium", type:"resize", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without AWSURL', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: String @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{type:"resize", name:"thumbnail",  width:100, height:100},
            {name:"medium", type:"resize", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without bucket argument', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid type argument', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{ name:"thumbnail",  width:100, height:100},
            {name:"medium", type:"resize", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid actions argument', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: []
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid action type', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{ name:"thumbnail", type:"foobar", width:100, height:100},
            {name:"medium", type:"foobar", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid action name', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{ name:"thumbnail", type:"resize", width:100, height:100},
            {name:"", type:"resize", width:500, height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid action width', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{ name:"thumbnail", type:"resize", width:100, height:100},
            {name:"thumb", type:"resize", width:"500px", height:500}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })

  test('Not creating Process Image Transformer without valid action height', () => {
    const invalidSchema = `
    type Todo 
        @model{
        id: ID!
        picture: AWSURL @processImage(
            bucket: "appimagestoreage113252-dev"
            actions: [{ name:"thumbnail", type:"resize", width:100, height:100},
            {name:"thumb", type:"resize", width:500, height:"500px"}]
        ) 
  }`;
    const transformer = new GraphQLTransform({
      transformers: [new ModelTransformer(), new Transformer()],
    });
    expect(() => transformer.transform(invalidSchema)).toThrowError();
  })