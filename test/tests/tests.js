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
      require('../fixtures/module');
    });
  });

  it('should let you get privateState', function() {
    var mod = require('../fixtures/module');
    assert.equal(mod.__get__('privateState'), 1);
  });

  it('should let you call privateFunction', function() {
    var mod = require('../fixtures/module');
    var func = mod.__get__('privateFunction');

    assert.equal(func(), 1);
  });

  it('privateCall should return result from privateFunction', function() {
    var mod = require('../fixtures/module');

    assert.equal(mod.privateCall(), 1);
  });

  it('should let you change privateFunction', function() {
    var mod = require('../fixtures/module');
    mod.__set__('privateFunction', sinon.stub().returns(2));

    assert.equal(mod.privateCall(), 2);
  });

  it('should not set on non functions', function() {
    var bool = require('../fixtures/boolean');
    assert.isUndefined(bool.__set__);
  });

  it('should not make __get__ and __set__ enumerable', function() {
    var keys = require('../fixtures/keys');
    assert.notInclude(Object.keys(keys), '__get__');
    assert.notInclude(Object.keys(keys), '__set__');
  });

  it('should attach to files without semicolons', function() {
    var semicolons = require('../fixtures/no-end-line-semicolons');
    assert.isDefined(semicolons.__set__);
  });

  it('should not fail on modules that pass through their dependency', function() {
    require('../fixtures/keys-pass-through');
  });
});
