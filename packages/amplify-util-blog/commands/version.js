async function run(context) {
  const package = require('../package.json');
  context.print.info(package.version);
}

module.exports = {
  run,
};
