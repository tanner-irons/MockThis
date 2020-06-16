'use strict';

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getCity = function _getCity() {
  return Chance.city();
};

var _getState = function _getState() {
  return Chance.state({
    country: 'us',
    'full': true
  });
};

var _getCountry = function _getCountry() {
  return Chance.country({
    full: true
  });
};

var _getCoordinates = function _getCoordinates() {
  return Chance.coordinates();
};

var _getZipCode = function _getZipCode() {
  return Chance.zip();
};

var _getAddress = function _getAddress() {
  return Chance.address();
};

module.exports = {
  Address: _getAddress,
  City: _getCity,
  Coordinates: _getCoordinates,
  Country: _getCountry,
  State: _getState,
  ZipCode: _getZipCode
};