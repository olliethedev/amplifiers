const fs = require("fs-extra");

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
  getAppSyncAPIs,
  getProjectConfig,
  isSupportedConfig,
};
