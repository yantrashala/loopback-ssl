'use strict';

var lt = require('loopback-testing');
var assert = require('assert');
var app = require('./fixtures/server-ssl/server.js'); //path to app.js or server.js

describe('Testing HTTPS Server Start', function () {
  describe('/notes', function() {
    lt.beforeEach.withApp(app);
    lt.describe.whenCalledRemotely('GET', '/notes', function() {
      it('should have statusCode 200', function(done) {
        assert.equal(this.res.statusCode, 200);
        done();
      });
    });
  });
});