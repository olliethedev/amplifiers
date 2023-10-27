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

Then, you can use the `amplify plugin add` command to add it to your Amplify CLI:
```bash
amplify plugin add /usr/local/lib/node_modules/@amplifiers/amplify-util-blog
```

Follow the prompts to add the `amplify-util-blog` plugin.

## Usage

To add blog functionality to your project, run:
```bash
amplify amplify-util-blog add
```

To remove blog functionality from your project, run:
```bash
amplify amplify-util-blog remove
```

