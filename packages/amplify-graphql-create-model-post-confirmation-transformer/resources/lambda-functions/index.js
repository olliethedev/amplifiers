const AWS = require('aws-sdk');
exports.handler = function(event, context, callback) {
  console.log('event', event);
  return event;
};
