'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');

const sinon = require('sinon');
sinon.assert.expose(chai.assert, {
  prefix: ''
});

global.assert = chai.assert;
