'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var loopbackSSL = require('../../../index');

var app = module.exports = loopback();

boot(app, __dirname, function(err) {
  if (err) throw err;
});

return loopbackSSL.startServer(app);
