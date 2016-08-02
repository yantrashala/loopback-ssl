'use strict';

/**
 *
 * @param app
 */
var startServer = function(app) {
  if (app.get('httpMode')) {
    return startHttp(app);
  } else {
    return startHttps(app);
  }
};

module.exports.startServer = startServer;
