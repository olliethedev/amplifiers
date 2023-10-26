// version-sync.js
const fs = require("fs");
const path = require("path");

const rootPackageJson = require("../package.json");
const workspaces = [
  "../packages/amplify-graphql-amplifiers-core",
  "../packages/amplify-graphql-create-model-transformer",
  "../packages/amplify-graphql-process-image-transformer",
  "../packages/amplify-graphql-send-email-transformer",
  "../packages/amplify-util-blog",
];

workspaces.forEach((workspace) => {
  const workspacePath = path.join(__dirname, workspace, "package.json");
  const workspacePackageJson = require(workspacePath);

  workspacePackageJson.version = rootPackageJson.version;

  fs.writeFileSync(
    workspacePath,
    JSON.stringify(workspacePackageJson, null, 2)
  );
});
