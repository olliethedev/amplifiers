[![Code Coverage](https://github.com/olliethedev/amplifiers/actions/workflows/coverage.yml/badge.svg)](https://github.com/olliethedev/amplifiers/actions/workflows/coverage.yml)

# Amplifiers #

Packages  | Description
------------- | -------------
[Amplifiers Core](https://github.com/olliethedev/amplifiers/tree/master/packages/amplify-graphql-amplifiers-core)  | Core shared functionality for the Amplifiers library
[Create Model Transformer](https://github.com/olliethedev/amplifiers/tree/master/packages/amplify-graphql-create-model-transformer)  | Creates a model on trigger event (ex. Cognito Post Confirmation)
[Send Email Transformer](https://github.com/olliethedev/amplifiers/tree/master/packages/amplify-graphql-send-email-transformer)  | Sends an email on DynamoDB mutation

## Development ##
- This project uses workspaces. To install dependencies run `npm install -ws` from the root directory.
- To build transformers and to zip the lambda functions `npm run compile -ws`
- To execute tests `npm test`

## Examples & Testing ##
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
        "file:///Users/ollie/Work/amplifiers/packages/amplify-graphql-create-model-transformer/dist/index.js"
    ]
}
```
- Make changes to the transformer and compile.
- To verify the stack before pushin run `amplify api gql-compile` from the example root directory
- To test remotely deploy the changes with `amplify push` from the example root directory

## License ##
[MIT License](https://github.com/olliethedev/amplifiers/blob/master/LICENSE)

## Contributions ##
Contributions are more than welcome! Please feel free to open an issue or a pull request.

## Credits ##
The _amplifiers_ library is maintained by 
- OllieTheDev [OllieTheDev](https://olliecodes.com)
