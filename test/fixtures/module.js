/*eslint no-unused-vars: 0 */

'use strict';

function privateFunction() {
  return 1;
}

const privateState = 1;

const PublicObj = {
  num: 1,
  privateCall() {
    return privateFunction();
  }
};

module.exports = PublicObj;
