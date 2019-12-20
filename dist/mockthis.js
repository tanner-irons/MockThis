'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.keys");

var With = _interopRequireWildcard(require("./mockthis.with.js"));

var As = _interopRequireWildcard(require("./mockthis.as.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      var key = current.parent ? current.parent + '.' + keys[i] : keys[i];

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

function MockedObject() {
  return function (_schema) {
    if (!_schema) {
      throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
    }

    if (!(_schema instanceof Object) || _schema instanceof Array) {
      throw new TypeError('Provided schema should be a valid object literal.');
    }

    var flatSchema = _makeFlat(_schema);

    this.blueprint.schema = Object.keys(flatSchema).map(function (prop) {
      return {
        property: prop,
        type: flatSchema[prop],
        dependencies: []
      };
    });
    return this;
  }.apply(MockedObject, arguments);
}

MockedObject.blueprint = {
  schema: {},
  sortedSchema: {},
  total: {
    min: 1,
    max: 1
  },
  required: [],
  formats: {},
  logic: [],
  array: {
    min: 1,
    max: 10
  }
};
MockedObject.as = {
  JSON: As.JSON.bind(MockedObject),
  Object: As.Object.bind(MockedObject)
};
MockedObject["with"] = MockedObject.and = {
  Multiple: With.Multiple.bind(MockedObject),
  ArrayLength: With.ArrayLength.bind(MockedObject),
  Required: With.Required.bind(MockedObject),
  NewType: With.NewType.bind(MockedObject),
  Random: With.Random.bind(MockedObject),
  Sequence: With.Sequence.bind(MockedObject),
  DateFormat: With.DateFormat.bind(MockedObject),
  Logic: With.Logic.bind(MockedObject)
};
module.exports = {
  MockThis: MockedObject,
  Types: require('./mockthis.types.js')
};