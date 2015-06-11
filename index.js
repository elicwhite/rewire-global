var mod = require('module');

var __get__ = require("rewire/lib/__get__").toString();
var __set__ = require("rewire/lib/__set__").toString();

var exportGet = "module.exports.__get__ = " + __get__ + ";\n";
var exportSet = "module.exports.__set__ = " + __set__ + ";\n";

var initalEnd = mod.wrapper[1];

var GlobalRewire = {
  enable: function() {
    mod.wrapper[1] = exportGet + exportSet + initalEnd;
  },

  disable: function() {
    mod.wrapper[1] = initalEnd;
  }
};

module.exports = GlobalRewire;
