"use strict";

var _getDefaultType = function _getDefaultType(blueprint, callingName) {
  return function (type) {
    if (callingName && callingName === type) {
      throw new TypeError('Cannot nest user-defined type: ' + type + ' inside of itself.');
    }

    return GeneratorFactory.getInstanceOf(type)(null, blueprint);
  };
};