async function run(context) {
  const header = `amplify amplify-util-blog <subcommand>`;

  const commands = [
    {
      name: 'add',
      description: `Modifies your GraphQL schema in your local backend and adds ui components to your project`,
    },
    {
      name: 'remove',
      description: `Removes Blog Plugin from your local backend and will remove them on amplify push`,
    },
    {
      name: 'version',
      description: 'Prints the version of Blog Plugin that you are using',
    },
  ];

  context.amplify.showHelp(header, commands);
  context.print.info('');
}

module.exports = {
  run,
};
