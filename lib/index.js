var chalk = require('chalk');

function debug(content) {
  var outputString = typeof content === 'string' ? content : JSON.stringify(content, null, 4);
  console.log(chalk.cyan(outputString));
}

var Log = {
  debug: debug
};

function initiateDebug(axios) {
  axios.interceptors.request.use(function (config) {
    Log.debug('Request:');
    Log.debug(config);
    return config;
  }, function (error) {
    Log.debug('Error:');
    Log.debug(error);
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    Log.debug('Response:');
    Log.debug(response);
    return response;
  }, function (error) {
    Log.debug('Error:');
    Log.debug(error);
    return Promise.reject(error);
  });
}

module.exports = initiateDebug;
