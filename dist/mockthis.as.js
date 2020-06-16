'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _topsort = _interopRequireDefault(require("topsort"));

var GeneratorFactory = _interopRequireWildcard(require("./generators/generator.factory.js"));

var _mockthis = require("./mockthis.utilities");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _generateValue = function _generateValue(blueprint, prop, tempObject) {
  var item = blueprint.schema.find(function (item) {
    return item.property === prop;
  });

  if (item.dependencies.length < 1) {
    if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= .2) {
      var factoryValue = GeneratorFactory.getInstanceOf(item.type);
      return factoryValue(blueprint);
    }

    return null;
  }

  var dependencies = item.dependencies.map(function (dep) {
    return tempObject[dep];
  });
  return GeneratorFactory.getInstanceOf(item.property).apply(null, dependencies);
};

var _sortSchema = function _sortSchema(blueprint) {
  var deps = [];
  blueprint.schema.forEach(function (prop) {
    deps.push.apply(deps, _toConsumableArray(prop.dependencies.reduce(function (acc, curr) {
      acc.push([curr, prop.property]);
      return acc;
    }, [[prop.property]])));
  });
  return (0, _topsort["default"])(deps).map(function (dep) {
    return blueprint.schema.find(function (item) {
      return item.property === dep || item.property === dep + '.0';
    });
  });
};

var _generateObject = function _generateObject(blueprint) {
  var tempObject = {};
  blueprint.sortedSchema.forEach(function (prop) {
    var generatedValue;

    if (/.0/g.test(prop.property)) {
      var arrayLength = (0, _mockthis.getRandomArrayLength)(blueprint.array.min, blueprint.array.max);

      for (var i = 0; i < arrayLength; i++) {
        generatedValue = _generateValue(blueprint, prop.property, tempObject);
        var newKey = prop.property.replace(/0/g, i);
        generatedValue && (tempObject[newKey] = generatedValue);
      }
    } else {
      generatedValue = _generateValue(blueprint, prop.property, tempObject);
      generatedValue && (tempObject[prop.property] = generatedValue);
    }
  });
  return (0, _mockthis.makeUnflat)(tempObject);
};

var _generateData = function _generateData(blueprint) {
  var tempArray = [];
  blueprint.sortedSchema = _sortSchema(blueprint);
  var arrayLength = (0, _mockthis.getRandomArrayLength)(blueprint.total.min, blueprint.total.max);

  for (var i = 0; i < arrayLength; i++) {
    tempArray.push(_generateObject(blueprint));
  }

  return tempArray.length > 1 ? tempArray : tempArray[0];
};

module.exports = {
  Object: function Object() {
    return _generateData(this.blueprint);
  },
  JSON: function (_JSON) {
    function JSON(_x, _x2) {
      return _JSON.apply(this, arguments);
    }

    JSON.toString = function () {
      return _JSON.toString();
    };

    return JSON;
  }(function (replacer, space) {
    return JSON.stringify(_generateData(this.blueprint), replacer, space);
  })
};