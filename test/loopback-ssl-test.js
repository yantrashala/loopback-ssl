'use strict';

var loopbackSSL = require('../lib/loopback-ssl');

var chai = require('chai');
var expect = chai.expect;

describe('Testing Certificate Configuration', function () {
  it('test:1 - should be able to load server key and certificates', function(done){
    done();
  });

  it('test:2 - should be able to load server key, ' +
    'certificates and client authentication certificate', function(done){
    done();
  });

  it('test:3 - should be able to load server key, ' +
    'certificates and multiple client authentication certificate', function(done){
    done();
  });

  it('test:4 - should be able enable mutual ssl', function(done){
    done();
  });

  it('test:5 - should be able disable client certificate validation', function(done){
    done();
  });

  it('test:6 - should fail if the key path is invalid', function(done){
    done();
  });
});