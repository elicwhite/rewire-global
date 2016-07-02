'use strict';

const mod = require('module');

const getImportGlobalsSrc = require('rewire/lib/getImportGlobalsSrc');
const getDefinePropertySrc = require('rewire/lib/getDefinePropertySrc');

const initialStart = mod.wrapper[0];
const initialEnd = mod.wrapper[1];

// We prepend a list of all globals declared with var so they can be overridden (without changing original globals)
let prelude = getImportGlobalsSrc();

// Wrap module src inside IIFE so that function declarations do not clash with global variables
// @see https://github.com/jhnns/rewire/issues/56
prelude += '(function () { ';

// We append our special setter and getter.
let appendix = '\n' + getDefinePropertySrc();

// End of IIFE
appendix += '})();';

const GlobalRewire = {
  enable() {
    mod.wrapper[0] = initialStart + prelude;
    mod.wrapper[1] = appendix + initialEnd;
  },

  disable() {
    mod.wrapper[0] = initialStart;
    mod.wrapper[1] = initialEnd;
  }
};

module.exports = GlobalRewire;
