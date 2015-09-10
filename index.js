var mod = require('module');

var getImportGlobalsSrc = require("rewire/lib/getImportGlobalsSrc");
var getDefinePropertySrc = require("rewire/lib/getDefinePropertySrc");

var initialStart = mod.wrapper[0];
var initalEnd = mod.wrapper[1];

var prelude = getImportGlobalsSrc();
prelude += "(function () { ";

var embed = "\nif (typeof(module.exports) === 'object' || typeof(module.exports) === 'function') {\n" +
  getDefinePropertySrc() +
'}';

var suffix = "\n" + embed;
suffix += "})();";

var GlobalRewire = {
  enable: function() {
    mod.wrapper[0] = initialStart + prelude;
    mod.wrapper[1] = suffix + initalEnd;
  },

  disable: function() {
    mod.wrapper[0] = initialStart;
    mod.wrapper[1] = initalEnd;
  }
};

module.exports = GlobalRewire;
