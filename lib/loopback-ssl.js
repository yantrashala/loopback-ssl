'use strict';

var https = require('https');
var fs = require('fs');
var path = require('path');
const debug = require('debug')('loopback-ssl:lib');

/**
 *
 * @param app
 * @returns {*}
 */
var startHttp = function(app) {
  debug('Starting in HTTP mode');
  var baseUrl = 'http://' + app.get('host') + ':' +  app.get('port');
  debug('baseUrl', baseUrl);
  return app.listen(app.get('port'), appStartEvent(app, baseUrl));
};

/**
 *
 * @param app
 * @returns {*}
 */
var startHttps = function(app) {
  var cfg = app.get('certConfig');
  debug('Starting in HTTPS mode');
  var options = null;
  try {
    options = getServerOptions(cfg);
    debug('Config Options: ', options);
  } catch (err) {
    console.error('Error reading certificates', err.stack);
    process.exit(1);
  }
  var server = https.createServer(options, app);
  var baseUrl = 'https://' + app.get('host') + ':' +  app.get('port');
  debug('baseUrl', baseUrl);
  return server.listen(app.get('port'), appStartEvent(app, baseUrl));
};

/**
 *
 * @param app
 * @param baseUrl
 */
var appStartEvent = function(app, baseUrl) {
  app.emit('started');
  console.log('Web server listening at: %s', baseUrl);
  if (app.get('loopback-component-explorer')) {
    var explorerPath = app.get('loopback-component-explorer').mountPath;
    console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  }
};

/**
 *
 * @param cfg
 * @returns {*}
 */
var getServerOptions = function(cfg) {
  var options = {};

  var certPath = path.resolve(cfg.path);
  debug('Starting in HTTPS mode - Reading certs from path', certPath);

  // create options which needs processing
  options = {
    key: fs.readFileSync(path.join(certPath, cfg.key)),
    cert: fs.readFileSync(path.join(certPath, cfg.cert)),
    ca: [],
  };

  for (var i = 0; i < cfg.ca.length; i++) {
    options.ca.push(fs.readFileSync(path.join(certPath, cfg.ca[i])));
  }

  // delete config keys which is no longer needed
  delete cfg.path;
  delete cfg.key;
  delete cfg.cert;
  delete cfg.ca;

  // merge processed options with rest of https config and return all
  return Object.assign(options, cfg);
};

module.exports.startHttp = startHttp;
module.exports.startHttps = startHttps;
module.exports.getServerOptions = getServerOptions;
