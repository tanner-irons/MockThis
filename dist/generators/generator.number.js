'use strict';

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getNumber = function _getNumber() {
  return Chance.natural({
    min: 1,
    max: 500
  });
};

module.exports = {
  Number: _getNumber
};