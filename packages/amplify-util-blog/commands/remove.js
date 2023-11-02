const fs = require("fs-extra");
const path = require("path");
const { getProjectConfig, getAppSyncAPIs } = require('../utils');

async function run(context) {
    context.print.info("Running removal process...");
    removeSchema(context);
    removeTransformerConfig(context);
    removeParametersConfig(context);
    removeUIElements(context);
    context.print.info("Removal process completed.");
}

function removeSchema(context) {
    const appSyncApis = getAppSyncAPIs(context);
    const apiName = appSyncApis[0].name;
    const schemaPath = path.join(
        context.amplify.pathManager.getBackendDirPath(),
        "api",
        apiName,
        "schema.graphql"
    );
    let schema = fs.readFileSync(schemaPath, "utf8");
    schema = schema.replace(/# BLOG SCHEMA START.*[\s\S]*# BLOG SCHEMA END.*\n/, '');
    fs.writeFileSync(schemaPath, schema);
    context.print.info("Removed blog schema from schema.graphql");
}

function removeTransformerConfig(context) {
    const appSyncApis = getAppSyncAPIs(context);
    const apiName = appSyncApis[0].name;
    const configFilePath = path.join(
        context.amplify.pathManager.getBackendDirPath(),
        "api",
        apiName,
        "transform.conf.json"
    );
    let configJSON = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    configJSON.transformers = configJSON.transformers.filter(t => t !== "amplify-graphql-typesense-transformer");
    fs.writeFileSync(configFilePath, JSON.stringify(configJSON, null, 4));
    context.print.info("Removed amplify-graphql-typesense-transformer from transform.conf.json");
}

function removeParametersConfig(context) {
    const appSyncApis = getAppSyncAPIs(context);
    const apiName = appSyncApis[0].name;
    const paramsFilePath = path.join(
        context.amplify.pathManager.getBackendDirPath(),
        "api",
        apiName,
        "parameters.json"
    );
    let parametersJSON = JSON.parse(fs.readFileSync(paramsFilePath, "utf8"));
    delete parametersJSON.TypesenseApiKey;
    delete parametersJSON.TypesenseHost;
    delete parametersJSON.TypesensePort;
    delete parametersJSON.TypesenseProtocol;
    fs.writeFileSync(paramsFilePath, JSON.stringify(parametersJSON, null, 4));
    context.print.info("Removed Typesense parameters from parameters.json");
}

function removeUIElements(context) {
    const projectConfig = getProjectConfig(context);
    const srcDir = projectConfig.javascript.config.SourceDir;
    const uiComponentsDestination = path.join(
        context.amplify.pathManager.searchProjectRootPath(),
        srcDir,
        "ui-components",
        "blog"
    );
    fs.removeSync(uiComponentsDestination);
    context.print.info("Removed blog folder from ui-components");
}

module.exports = {
    run,
};
