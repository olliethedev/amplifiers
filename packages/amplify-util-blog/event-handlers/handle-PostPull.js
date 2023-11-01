
const eventName = 'PostPull';

async function run(context, args) {
  // insert your code to handle the amplify cli PrePush event
  context.print.info(`Running ${eventName} handler.`);

  context.print.info(`Finished ${eventName} handler.`);
}



module.exports = {
  run,
};
