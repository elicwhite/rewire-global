/*jshint unused:false */

function privateFunction() {
  return 1;
}

var privateState = 1;

var PublicObj = {
  num: 1,
  privateCall: function() {
    return privateFunction();
  }
};

module.exports = PublicObj;
