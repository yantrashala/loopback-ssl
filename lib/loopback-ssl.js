'use strict';

var https = require('https');
var fs = require('fs');
var path = require('path');

/**
 *
 * @param app
 * @returns {*}
 */
var startHttp = function(app) {
  var baseUrl = 'http://' + app.get('host') + ':' +  app.get('port');
  return app.listen(app.get('port'), appStartEvent(app, baseUrl));
};

/**
 *
 * @param app
 * @returns {*}
 */
var startHttps = function(app) {
  var cfg = app.get('certConfig');
  var options = null;
  try {
    options = getServerOptions(cfg);
  } catch (err) {
    console.error('Error reading certificates', err.stack);
    process.exit(1);
  }
  var server = https.createServer(options, app);
  var baseUrl = 'https://' + app.get('host') + ':' +  app.get('port');
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
 * @param app
 * @returns {{key: *, cert: *, ca: Array, requestCert: *, rejectUnauthorized: *}}
 */
var getServerOptions = function(cfg) {
  var certPath = path.resolve(cfg.path);
  var key = fs.readFileSync(path.join(certPath, cfg.key));
  var cert = fs.readFileSync(path.join(certPath, cfg.cert));
  var ca = [];
  for (var i = 0; i < cfg.ca.length; i++) {
    ca.push(fs.readFileSync(path.join(certPath, cfg.ca[i])));
  }
  return  {
    key: key,
    cert: cert,
    ca: ca,
    requestCert: cfg.requestCert,
    rejectUnauthorized: cfg.rejectUnauthorized
  };
};

module.exports.startHttp = startHttp;
module.exports.startHttps = startHttps;
module.exports.getServerOptions = getServerOptions;
