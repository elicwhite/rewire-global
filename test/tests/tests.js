'use strict';

var sinon = require('sinon');
var globalRewire = require('../../');

describe('global-rewire', function() {
  beforeEach(function() {
    globalRewire.enable();
  });

  afterEach(function() {
    globalRewire.disable();
  });

  it('should let you require a file', function() {
    assert.doesNotThrow(function() {
      require('../fixtures/module.js');
    });
  });

  it('should let you get privateState', function() {
    var mod = require('../fixtures/module.js');
    assert.equal(mod.__get__('privateState'), 1);
  });

  it('should let you call privateFunction', function() {
    var mod = require('../fixtures/module.js');
    var func = mod.__get__('privateFunction');

    assert.equal(func(), 1);
  });

  it('privateCall should return result from privateFunction', function() {
    var mod = require('../fixtures/module.js');

    assert.equal(mod.privateCall(), 1);
  });

  it('should let you change privateFunction', function() {
    var mod = require('../fixtures/module.js');
    mod.__set__('privateFunction', sinon.stub().returns(2));

    assert.equal(mod.privateCall(), 2);
  });

  it('should not set on non functions', function() {
    var bool = require('../fixtures/boolean.js');
    assert.isUndefined(bool.__set__);
  });
});
