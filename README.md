
# Amplifiers #

## Development ##
- This project uses workspaces. To install dependencies run `npm install -ws` from the root directory.
- To build transformers and to zip the lambda functions `npm run compile -ws`
- To execute tests `npm test`

## Testing ##
To run and example project from the [examples](https://github.com/olliethedev/amplifiers/tree/master/examples) directory: 

- `cd examples/create-model-post-conf/`
- From the example root directory run `npm install` 
- Have amplify-cli installed globally and run `amplify init` in the example root directory
- Import the transformer with the absolute path in the `examples/<example-project-name>/amplify/backend/api/<api-name>/transform.conf.json` for example:
```json
{
    "Version": 5,
    "ElasticsearchWarning": true,
    "transformers": [
        "file:///Users/ollie/Work/amplifiers/packages/amplify-graphql-create-model-post-confirmation-transformer/dist/index.js"
    ]
}
```
- Make changes to the transformer and compile.
- To verify the stack before pushin run `amplify api gql-compile` from the example root directory
- To test remotely deploy the changes with `amplify push` from the example root directory