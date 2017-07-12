'use strict';

var loopbackSSL = require('./lib/loopback-ssl');
const debug = require('debug')('loopback-ssl:index');

/**
 *
 * @param app
 */
var startServer = function(app) {
  if (app.get('httpMode')) {
    return loopbackSSL.startHttp(app);
  } else {
    return loopbackSSL.startHttps(app);
  }
};

module.exports.startServer = startServer;
