var mod = require('module');

var __get__ = require("rewire/lib/__get__").toString();
var __set__ = require("rewire/lib/__set__").toString();
var __with__ = require("rewire/lib/__with__").toString();

var exportGet = "Object.defineProperty(module.exports, '__get__', { value: " + __get__ + ", writable: true });\n";
var exportSet = "Object.defineProperty(module.exports, '__set__', { value: " + __set__ + ", writable: true });\n";
var exportWith = "Object.defineProperty(module.exports, '__with__', { value: " + __with__ + ", writable: true });\n";

var initalEnd = mod.wrapper[1];

var embed = "\nif (Object.isExtensible(module.exports)) {\n" +
  exportGet +
  exportSet +
  exportWith +
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
