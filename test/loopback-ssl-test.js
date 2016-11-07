'use strict';

var loopbackSSL = require('../lib/loopback-ssl');
var assert = require('chai').assert;

var testConfig1 = require('./fixtures/configs/config-1.json');
var testConfig2 = require('./fixtures/configs/config-2.json');
var testConfig3 = require('./fixtures/configs/config-3.json');
var testConfig4 = require('./fixtures/configs/config-4.json');
var testConfig5 = require('./fixtures/configs/config-5.json');
var testConfig6 = require('./fixtures/configs/config-6.json');
var testConfig7 = require('./fixtures/configs/config-7.json');

describe('Testing Certificate Configuration', function () {
  it('test:1 - should be able to load server key and certificates', function(done){
    var ret = loopbackSSL.getServerOptions(testConfig1.certConfig);
    done();
  });

  it('test:2 - should be able to load server key, ' +
    'certificates and client authentication certificate', function(done){
    var ret = loopbackSSL.getServerOptions(testConfig2.certConfig);
    done();
  });

  it('test:3 - should be able to load server key, ' +
    'certificates and multiple client authentication certificate', function(done){
    var ret = loopbackSSL.getServerOptions(testConfig3.certConfig);
    done();
  })

  it('test:4 - should be able enable mutual ssl', function(done){
    var ret = loopbackSSL.getServerOptions(testConfig4.certConfig);
    assert.equal(ret.rejectUnauthorized, true);
    done();
  });

  it('test:5 - should be able disable client certificate validation', function(done){
    var ret = loopbackSSL.getServerOptions(testConfig5.certConfig);
    assert.equal(ret.rejectUnauthorized, false);
    done();
  });

  it('test:6 - should fail if the key path is invalid', function(done){
    try {
      loopbackSSL.getServerOptions(testConfig6.certConfig);
    } catch (e) {
      done();
    }
  });

  it('test:7 - should pass httpMode=true and no other options are provided', function(done){
    try {
      loopbackSSL.getServerOptions(testConfig7.certConfig);
    } catch (e) {
      done();
    }
  });
});
