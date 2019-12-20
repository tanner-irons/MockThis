'use strict';

var userDefTypes = {};

var _addUserDefType = function _addUserDefType(type, callback) {
  userDefTypes[type] = callback;
};

module.exports = {
  addType: _addUserDefType,
  userDefTypes: userDefTypes
};