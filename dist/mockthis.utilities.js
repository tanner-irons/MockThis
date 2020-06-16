"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

var GeneratorFactory = _interopRequireWildcard(require("./generators/generator.factory.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _getDefaultType = function _getDefaultType(blueprint, callingName) {
  return function (type) {
    if (callingName && callingName === type) {
      throw new TypeError("Cannot nest user-defined type: ".concat(type, " inside of itself."));
    }

    return GeneratorFactory.getInstanceOf(type)(null, blueprint);
  };
};

var _makeFlat = function _makeFlat(schema) {
  var flattened = {};
  var stack = [{
    parent: null,
    nodes: schema
  }];

  while (stack.length > 0) {
    var current = stack.pop();

    if (!current || Object.keys(current.nodes || {}).length === 0) {
      continue;
    }

    var keys = Object.keys(current.nodes);

    for (var i = 0; i < keys.length; i++) {
      var key = current.parent ? "".concat(current.parent, ".").concat(keys[i]) : keys[i];

      if (current.nodes[keys[i]] instanceof Object) {
        stack.push({
          parent: key,
          nodes: current.nodes[keys[i]]
        });
      } else {
        flattened[key] = current.nodes[keys[i]];
      }
    }
  }

  return flattened;
};

var _makeUnflat = function _makeUnflat(schema) {
  var unflat = {};
  var keys = Object.keys(schema);

  for (var i = 0; i < keys.length; i++) {
    var current = unflat;
    var parts = keys[i].split('.');

    for (var j = 0; j < parts.length - 1; j++) {
      if (!current[parts[j]]) {
        current[parts[j]] = {};
      }

      current = current[parts[j]];
    }

    current[parts[parts.length - 1]] = schema[keys[i]];
  }

  return unflat;
};

var _getRandomArrayLength = function _getRandomArrayLength(min, max) {
  return max && min !== max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
};

module.exports = {
  getDefaultType: _getDefaultType,
  getRandomArrayLength: _getRandomArrayLength,
  makeFlat: _makeFlat,
  makeUnflat: _makeUnflat
};