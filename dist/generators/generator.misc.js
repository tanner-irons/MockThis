'use strict';

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getAnimal = function _getAnimal() {
  return Chance.animal();
};

var _getPhoneNumber = function _getPhoneNumber() {
  return Chance.phone();
};

module.exports = {
  Animal: _getAnimal,
  PhoneNumber: _getPhoneNumber
};