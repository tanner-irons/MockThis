define([], function () {
    'use strict';

    let userDefTypes = {};

    let _addUserDefType = function(type, callback) {
        userDefTypes[type] = callback;
    };

    return {
        addType: _addUserDefType,
        userDefTypes: userDefTypes
    }
}); 