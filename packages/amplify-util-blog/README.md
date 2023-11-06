# Amplify Util Blog

Amplify Util Blog is a utility plugin for the Amplify CLI that helps you add blog functionality to your Amplify project. It provides commands to add and remove blog related resources, and it also updates your GraphQL schema, parameters, transformer configuration, and UI elements to support blog features.

## Features

- Adds Post and Tag models to your GraphQL schema.
- Adds blog related UI components to your project.
- Updates parameters configuration with Typesense related parameters to enable search.
- Updates transformer configuration to include `amplify-graphql-typesense-transformer` to enable search.
- Supports only JavaScript/TypeScript React projects.

## Commands

- `version`: Displays the version of the plugin.
- `help`: Provides help information for the plugin.
- `add`: Adds blog related resources to your project.
- `remove`: Removes blog related resources from your project.


## Installation

To use this plugin, you need to install it globally:
```bash
npm install -g @amplifiers/amplify-util-blog
```
The plugin uses typesense transformer for search, and ui supports markdown for blog content and rest of the components are amplify-ui, so we will also need to install the following:
```bash
npm install -s amplify-graphql-typesense-transformer @aws-amplify/ui-react @aws-amplify/ui-react-storage aws-amplify react-markdown remark-gfm remark-footnotes react-syntax-highlighter @uiw/react-md-editor@v3.6.0
```
```bash 
npm install --save-dev @types/react-syntax-highlighter
```

Then, you can use the `amplify plugin add` command to add it to your Amplify CLI:
```bash
amplify plugin add /usr/local/lib/node_modules/@amplifiers/amplify-util-blog
```

Follow the prompts to add the `amplify-util-blog` plugin.

Remember to update the typesense api key and endpoint in your `parameters.json` if you plan to use search.

## NextJS Support for react-md-editor

```bash
npm install next-remove-imports
npm install @uiw/react-md-editor@v3.6.0
```

```js
// next.config.js
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});
```

Load the forms (NewPostLayout, UpdatePostLayout) using the `dynamic` function from `next/dynamic`:

```js
import dynamic from "next/dynamic";

const NewPostLayout = dynamic(
  () => import("../../ui-components/blog/NewPostLayout"),
  {
    ssr: false,
  }
);
```

## Usage

To add blog functionality to your project, run:
```bash
amplify amplify-util-blog add
```

To remove blog functionality from your project, run:
```bash
amplify amplify-util-blog remove
```

## Results

![alt text](https://github.com/olliethedev/amplifiers/raw/master/markdown-assets/blog-1.png)

![alt text](https://github.com/olliethedev/amplifiers/raw/master/markdown-assets/blog-2.png)

![alt text](https://github.com/olliethedev/amplifiers/raw/master/markdown-assets/blog-3.png)

