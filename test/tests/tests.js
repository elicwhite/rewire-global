'use strict';

const sinon = require('sinon');
const globalRewire = require('../../');

describe('global-rewire', () => {
  beforeEach(() => {
    globalRewire.enable();
  });

  afterEach(() => {
    globalRewire.disable();
  });

  it('should let you require a file', () => {
    assert.doesNotThrow(() => {
      require('../fixtures/module');
    });
  });

  it('should let you get privateState', () => {
    const mod = require('../fixtures/module');
    assert.equal(mod.__get__('privateState'), 1);
  });

  it('should let you call privateFunction', () => {
    const mod = require('../fixtures/module');
    const func = mod.__get__('privateFunction');

    assert.equal(func(), 1);
  });

  it('privateCall should return result from privateFunction', () => {
    const mod = require('../fixtures/module');

    assert.equal(mod.privateCall(), 1);
  });

  it('should let you change privateFunction', () => {
    const mod = require('../fixtures/module');
    mod.__set__('privateFunction', sinon.stub().returns(2));

    assert.equal(mod.privateCall(), 2);
  });

  it('should not set on non functions', () => {
    const bool = require('../fixtures/boolean');
    assert.isUndefined(bool.__set__);
  });

  it('should not make __get__ and __set__ enumerable', () => {
    const keys = require('../fixtures/keys');
    assert.notInclude(Object.keys(keys), '__get__');
    assert.notInclude(Object.keys(keys), '__set__');
  });

  it('should attach to files without semicolons', () => {
    const semicolons = require('../fixtures/no-end-line-semicolons');
    assert.isDefined(semicolons.__set__);
  });

  it('should not fail on modules that pass through their dependency', function() {
    require('../fixtures/keys-pass-through');
  });
});
