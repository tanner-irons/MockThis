'use strict';

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getFirstName = function _getFirstName() {
  return Chance.first();
};

var _getLastName = function _getLastName() {
  return Chance.last();
};

module.exports = {
  First: _getFirstName,
  Last: _getLastName
};