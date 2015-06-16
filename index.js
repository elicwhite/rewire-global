var mod = require('module');

var __get__ = require("rewire/lib/__get__").toString();
var __set__ = require("rewire/lib/__set__").toString();

var exportGet = "Object.defineProperty(module.exports, '__get__', { value: " + __get__ + ", writable: true });\n";
var exportSet = "Object.defineProperty(module.exports, '__set__', { value: " + __set__ + ", writable: true });\n";

var initalEnd = mod.wrapper[1];

var embed = "if (typeof(module.exports) === 'object' || typeof(module.exports) === 'function') {\n" +
  exportGet +
  exportSet +
'}';

var GlobalRewire = {
  enable: function() {
    mod.wrapper[1] = embed + initalEnd;
  },

  disable: function() {
    mod.wrapper[1] = initalEnd;
  }
};

module.exports = GlobalRewire;
