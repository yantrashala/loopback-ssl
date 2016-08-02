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
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

/**
 *
 * @param app
 * @returns {*}
 */
var startHttps = function(app) {
  var cfg = app.get('certConfig');
  var options = getServerOptions(cfg);
  var server = https.createServer(options, app);
  var baseUrl = 'https://' + app.get('host') + ':' +  app.get('port');
  return server.listen(app.get('port'), function() {
    app.emit('started');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

/**
 *
 * @param app
 * @returns {{key: *, cert: *, ca: Array, requestCert: *, rejectUnauthorized: *}}
 */
var getServerOptions = function(cfg) {
  try {
    var key = fs.readFileSync(path.join(cfg.path, cfg.key));
    var cert = fs.readFileSync(path.join(cfg.path, cfg.cert));
    var ca = [];
    for (var i = 0; i < cfg.ca.length; i++) {
      ca.push(fs.readFileSync(path.join(cfg.path, cfg.ca[i])));
    }
    return  {
      key: key,
      cert: cert,
      ca: ca,
      requestCert: cfg.requestCert,
      rejectUnauthorized: cfg.rejectUnauthorized
    };
  } catch (err) {
    console.error('Error reading certificates', err.stack);
    process.exit(1);
  }
};

module.exports.startHttp = startHttp;
module.exports.startHttps = startHttps;
module.exports.getServerOptions = getServerOptions;
