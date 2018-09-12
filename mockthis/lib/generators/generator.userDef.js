'use strict';

let userDefTypes = {};

let _addUserDefType = function (type, callback) {
    userDefTypes[type] = callback;
};

module.exports =  {
    addType: _addUserDefType,
    userDefTypes: userDefTypes
};