'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var chance = _interopRequireWildcard(require("chance"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Chance = new chance();

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