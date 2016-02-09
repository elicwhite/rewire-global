var mod = require('module');

var getImportGlobalsSrc = require('rewire/lib/getImportGlobalsSrc');
var getDefinePropertySrc = require('rewire/lib/getDefinePropertySrc');

var initialStart = mod.wrapper[0];
var initialEnd = mod.wrapper[1];

// We prepend a list of all globals declared with var so they can be overridden (without changing original globals)
var prelude = getImportGlobalsSrc();

// Wrap module src inside IIFE so that function declarations do not clash with global variables
// @see https://github.com/jhnns/rewire/issues/56
prelude += "(function () { ";

// We append our special setter and getter.
var appendix = "\n" + getDefinePropertySrc();

// End of IIFE
appendix += "})();";

var GlobalRewire = {
  enable: function() {
    mod.wrapper[0] = initialStart + prelude;
    mod.wrapper[1] = appendix + initialEnd;
  },

  disable: function() {
    mod.wrapper[0] = initialStart;
    mod.wrapper[1] = initialEnd;
  }
};

module.exports = GlobalRewire;
