# loopback-ssl

Component for [loopback] to enable SSL or Mutual SSL Authentication

[![NPM](https://nodei.co/npm/loopback-ssl.png?downloads=true)](https://nodei.co/npm/loopback-ssl/) 

[![NPM](https://nodei.co/npm-dl/loopback-ssl.png?months=3&height=3)](https://nodei.co/npm/loopback-ssl/)

[![Build status](https://img.shields.io/travis/yantrashala/loopback-ssl/master.svg?style=flat-square)](https://travis-ci.org/yantrashala/loopback-ssl) [![codecov](https://codecov.io/gh/yantrashala/loopback-ssl/branch/master/graph/badge.svg)](https://codecov.io/gh/yantrashala/loopback-ssl)

# Features
- Enable SSL in Loopback application
- Enable mutual SSL authentication in Loopback

# Usage

## Setup

### Install [loopback]:
```js
slc loopback <app-name>

cd <app-name>
```

### Install [loopback-ssl]:
```js
npm install loopback-ssl --save
```

### Setup Configuration: 
Add the following lines of configuration in 'config.json' in location "\<app-dir\>/server/config.json"
```js
  "httpMode": false,
  "certConfig": {
    "path": "/certificate/path/",
    "key": "local.pem",
    "cert": "local.crt.pem",
    "ca": [],
    "requestCert": false,
    "rejectUnauthorized": false
  }
```

### Configure server.js
Edit the server.js located at "\<app-dir\>/server/server.js"

Add the following line at the top of the code.
```js
var loopbackSSL = require('loopback-ssl');
```

Replace the all the content within the code block starting with 
```js
app.start = function() {
```

with following code
```js
return loopbackSSL.startServer(app);
```

## Disable HTTPS
The configuration entry `"httpMode": false"` will disable https. In this mode the `certConfig: {..}` configuration is not used and can be omitted.

## Enable SSL
Configuration sample to enable SSL
```js
  "httpMode": true,
  "certConfig": {
    "path": "/certificate/path/",
    "key": "serverkey.pem",
    "cert": "server-certificate.pem",
    "ca": [],
    "requestCert": false,
    "rejectUnauthorized": false
  }
```
- `"path"` - folder location where the certificates files will be installed
- `"key"` - server key
- `"cert"` - server certificate

## Enable Mutual SSL
```js
  "httpMode": true,
  "certConfig": {
    "path": "/certificate/path/",
    "key": "serverkey.pem",
    "cert": "server-certificate.pem",
    "ca": [
        "client-certificate-to-validate.pem"
    ],
    "requestCert": true,
    "rejectUnauthorized": true
  }
```
- The `ca[]` configuration contains the list of client certificates which the server will authenticate
- `"requestCert": true` enables mutual SSL authentication
- `"rejectUnauthorized": true` enables the authenticity and validity check of client keys
- For any reason, if the client certificate is a self signed certificate, `rejectUnauthorized` can be set to `false`.

# License

[MIT](./LICENSE).

# See Also

- [Loopback][loopback]
- [Trusted Peer - Example][trusted_peer]
- [Self Signed Certificates - Example][self_signed]

[loopback]: http://loopback.io
[loopback-ssl]: https://www.npmjs.com/package/loopback-ssl
[trusted_peer]: https://github.com/coolaj86/nodejs-ssl-trusted-peer-example
[self_signed]: https://github.com/coolaj86/nodejs-self-signed-certificate-example
