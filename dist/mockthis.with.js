'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.find");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("regenerator-runtime/runtime");

var UserDefGenerator = _interopRequireWildcard(require("./generators/generator.userDef.js"));

var moment = _interopRequireWildcard(require("moment"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _newType = function _newType(newType, callback) {
  if (typeof newType != 'string') {
    throw new TypeError('User defined property name must be a string.');
  }

  if (!(callback instanceof Function)) {
    throw new TypeError('User defined property callback must be a function.');
  }

  callback.userType = newType;
  UserDefGenerator.addType(newType, callback);
  return this;
};

var _random = function _random(randomName, items) {
  var randomCallback = function randomCallback() {
    var random = Math.floor(Math.random() * items.length);
    return items[random];
  };

  return _newType.call(this, randomName, randomCallback);
};

var _sequence = function _sequence(sequenceName, items) {
  var sequenceGenerator =
  /*#__PURE__*/
  regeneratorRuntime.mark(function sequenceGenerator() {
    var index;
    return regeneratorRuntime.wrap(function sequenceGenerator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            index = 0;

          case 1:
            if (!true) {
              _context.next = 9;
              break;
            }

            if (items[index]) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return items[index];

          case 6:
            index++;
            _context.next = 1;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, sequenceGenerator);
  });
  var sequence = sequenceGenerator(items);
  return _newType.call(this, sequenceName, function () {
    var result = sequence.next();

    if (result.done) {
      sequence = sequenceGenerator(items);
      return sequence.next().value;
    }

    return result.value;
  });
};

var _logic = function _logic(prop, deps) {
  if (deps instanceof Function) {
    throw new Error('Please add dependency array or use the NewType method.');
  }

  var callback = deps.pop();

  if (!(callback instanceof Function)) {
    throw new TypeError('Last argument in the dependency array must be a function.');
  }

  var item = this.blueprint.schema.find(function (item) {
    return item.property === prop || item.property === prop + '.0';
  });

  if (!item) {
    throw new Error('Property: ' + item.property + ' does not exist');
  }

  _newType.call(this, prop, callback);

  deps.length && (item.dependencies = deps);
  return this;
};

var _multiple = function _multiple(min, max) {
  if (isNaN(min)) {
    throw new TypeError('Min argument must be a number.');
  } else if (min < 0) {
    throw new Error('Min argument must be a postive integer or 0.');
  } else if (max && isNaN(max)) {
    throw new TypeError('Max argument must be a number.');
  } else if (max < 0) {
    throw new Error('Max argument must be a postive integer or 0.');
  }

  this.blueprint.total = {
    min: min,
    max: max || min
  };
  return this;
};

var _arrayLength = function _arrayLength(min, max) {
  if (isNaN(min)) {
    throw new TypeError('Min argument must be a number.');
  } else if (min < 0) {
    throw new Error('Min argument must be a postive integer or 0.');
  } else if (max && isNaN(max)) {
    throw new TypeError('Max argument must be a number.');
  } else if (max && max < 0) {
    throw new Error('Max argument must be a postive integer or 0.');
  }

  this.blueprint.array = {
    min: min,
    max: max || min
  };
  return this;
};

var _required = function _required(required) {
  if (!(required instanceof Array)) {
    throw new TypeError('Required properties must be an array.');
  }

  if (this.blueprint.required.length > 0) {
    console.warn('Required properties have already been declared. Please call required method only once.');
    return this;
  }

  this.blueprint.required = required;
  return this;
};

var _dateFormat = function _dateFormat(dateFormat) {
  if (moment().format(dateFormat).toString() === 'InvalidDate') {
    throw new TypeError('Date format argument must be a valid date format.');
  }

  this.blueprint.formats.date = dateFormat;
  return this;
};

module.exports = {
  Multiple: _multiple,
  Required: _required,
  NewType: _newType,
  Random: _random,
  Sequence: _sequence,
  DateFormat: _dateFormat,
  ArrayLength: _arrayLength,
  Logic: _logic
};