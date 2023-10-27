const fs = require("fs-extra");
const path = require("path");
const eventName = "add";

async function run(context) {
  context.print.info(`Event handler ${eventName} is running.`);
  updateSchema(context);
  updateTransformerConfig(context);
  updateParametersConfig(context);
  updateUIElements(context);
  updateUIElementsIndex(context);
  context.print.info(`Done running ${eventName}`);
}

function updateSchema(context) {
  // Get the API name from the context
  const appSyncApis = getAppSyncAPIs(context);

  if (appSyncApis.length === 0) {
    context.print.info("No AppSync API found in the project");
    return;
  } else if (appSyncApis.length > 1) {
    context.print.info("More than one AppSync API found in the project");
    return;
  }

  const apiName = appSyncApis[0].name; // get the name of the first API
  console.log(`API Name: ${apiName}`);

  // Define the paths to the schema files

  const schemaPath = path.join(
    context.amplify.pathManager.getBackendDirPath(),
    "api",
    apiName,
    "schema.graphql"
  );

  // Read the contents of the schema files
  const schema = fs.readFileSync(schemaPath, "utf8");
  const blogSchemaStart = schema.indexOf("# BLOG SCHEMA START.");
  const blogSchemaEnd = schema.indexOf("# BLOG SCHEMA END.");
  if (blogSchemaStart !== -1 && blogSchemaEnd !== -1) {
    context.print.info(
      "Post and Tag models already exist in schema.graphql. Remove them and run `amplify amplify-util-blog add` again."
    );
    return;
  }
  const blogSchema = `
  # BLOG SCHEMA START. 
  # This code is added by the amplify-blog plugin. Only modify this code if you are sure what you are doing.
  
  type Post @model @typesense @auth(rules: [
    { allow: groups, groups: ["Admins"] },
    { allow: public, operations: [read] }
    ]){
    slug: ID! @primaryKey
    title: String!
    description: String!
    content: String!
    image: String!
    published: Boolean!
    tags: [Tag] @manyToMany(relationName: "PostTag")
  }
  
  type Tag @model @auth(rules: [
    { allow: groups, groups: ["Admins"] },
    { allow: public, operations: [read] }
    ]){
    name: ID! @primaryKey
    posts: [Post] @manyToMany(relationName: "PostTag")
  }

  # BLOG SCHEMA END.

  `;

  // Merge the schemas
  const mergedSchema = `${schema}\n${blogSchema}`;

  // Write the merged schema back to the schema.graphql file
  fs.writeFileSync(schemaPath, mergedSchema);

  context.print.info("Merged schema.graphql and blogSchema.graphql");
}

function updateParametersConfig(context) {
  const appSyncApis = getAppSyncAPIs(context);

  const apiName = appSyncApis[0].name;

  const paramsFilePath = path.join(
    context.amplify.pathManager.getBackendDirPath(),
    "api",
    apiName,
    "parameters.json"
  );

  const parameters = fs.readFileSync(paramsFilePath, "utf8");
  let parametersJSON = JSON.parse(parameters);

  parametersJSON = {
    ...parametersJSON,
    TypesenseApiKey: "<your-api-key>",
    TypesenseHost: "<your-typesense-host>",
    TypesensePort: "443",
    TypesenseProtocol: "https",
  };

  fs.writeFileSync(paramsFilePath, JSON.stringify(parametersJSON, null, 4));
}

function updateTransformerConfig(context) {
  const appSyncApis = getAppSyncAPIs(context);

  const apiName = appSyncApis[0].name;

  const configFilePath = path.join(
    context.amplify.pathManager.getBackendDirPath(),
    "api",
    apiName,
    "transform.conf.json"
  );

  const config = fs.readFileSync(configFilePath, "utf8");
  let configJSON = JSON.parse(config);

  if (
    configJSON.transformers &&
    !configJSON.transformers.includes("amplify-graphql-typesense-transformer")
  ) {
    configJSON.transformers.push("amplify-graphql-typesense-transformer");
  } else {
    configJSON = {
      ...configJSON,
      transformers: ["amplify-graphql-typesense-transformer"],
    };
  }

  fs.writeFileSync(configFilePath, JSON.stringify(configJSON, null, 4));
}

function updateUIElements(context) {
  const projectConfig = getProjectConfig(context);

  context.print.info(projectConfig);

  if (!isSupportedConfig(context)) {
    return;
  }

  const srcDir = projectConfig.javascript.config.SourceDir;

  const uiComponentsDestination = path.join(
    context.amplify.pathManager.searchProjectRootPath(),
    srcDir,
    "ui-components",
    "blog"
  );

  if (fs.existsSync(uiComponentsDestination)) {
    context.print.info(
      "Blog folder already exists in ui-components. Remove it and run `amplify amplify-util-blog add` again."
    );
    return;
  }

  const uiComponentsSource = path.join(
    __dirname,
    "..",
    "ui-components",
    "blog"
  );

  context.print.info(uiComponentsSource);
  context.print.info(uiComponentsDestination);

  fs.copySync(uiComponentsSource, uiComponentsDestination);
}

function updateUIElementsIndex(context) {
  const projectConfig = getProjectConfig(context);
  if (!isSupportedConfig(context)) {
    return;
  }

  const srcDir = projectConfig.javascript.config.SourceDir;

  const uiComponentsIndexPath = path.join(
    context.amplify.pathManager.searchProjectRootPath(),
    srcDir,
    "ui-components",
    "index.js"
  );

  const uiComponentsIndex = fs.readFileSync(uiComponentsIndexPath, "utf8");

  const blogImport = `export * from './blog';`;

  if (!uiComponentsIndex.includes(blogImport)) {
    const newUIComponentsIndex = `${uiComponentsIndex}\n${blogImport}`;
    fs.writeFileSync(uiComponentsIndexPath, newUIComponentsIndex);
  }
}

function getAppSyncAPIs(context) {
  const apiMeta = context.amplify.getProjectMeta().api;

  const appSyncApis = Object.keys(apiMeta)
    .map((key) => ({ ...apiMeta[key], name: key }))
    .filter((api) => api.service === "AppSync");
  console.log(`Found ${appSyncApis.length} APIs `);
  return appSyncApis;
}

function getProjectConfig(context) {
  const projectConfigPath =
    context.amplify.pathManager.getProjectConfigFilePath();

  return JSON.parse(fs.readFileSync(projectConfigPath, "utf8"));
}

function isSupportedConfig(context) {
  const projectConfig = getProjectConfig(context);

  if (projectConfig.frontend !== "javascript") {
    context.print.info(
      "Blog Plugin only supports javascript/typescript front-end project for now"
    );
    return false;
  } else if (projectConfig.javascript.framework !== "react") {
    context.print.info(
      "Blog Plugin only supports react front-end project for now"
    );
    return false;
  }

  return true;
}

module.exports = {
  run,
};
