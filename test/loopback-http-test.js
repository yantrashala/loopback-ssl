'use strict';

var lt = require('loopback-testing');
var assert = require('assert');
var app = require('./fixtures/server/server.js'); //path to app.js or server.js

describe('Testing HTTP Server Start', function () {
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