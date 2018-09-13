'use strict';

let moment = require('moment');

let UserDefGenerator = require('./generators/generator.userDef.js');

let _multiple = function (amount) {
    if(isNaN(amount)) {
        throw new TypeError('Multiple arguement must be a string.')
    }
    this.blueprint.total = amount;
    return this;
};

let _required = function (required) {
    if (!(required instanceof Array)) {
        throw new TypeError('Required properties must be an array.')
    }
    if(this.blueprint.required.length > 0) {
        console.warn('Required properties have already been declared. Please call required method only once.');
        return this;
    }
    this.blueprint.required = required;
    return this;
};

let _newType = function (newType, callback) {
    if (typeof newType != 'string') {
        throw new TypeError('User defined property name must be a string.')
    }
    if(!(callback instanceof Function)) {
        throw new TypeError('User defined property callback must be a function.')
    }
    UserDefGenerator.addType(newType, callback);
    return this;
};

let _dateFormat = function (dateFormat) {
    if(!(moment((new Date()).toISOString(), dateFormat).isValid())) {
        throw new TypeError('Date format arguement must be a valid date format.');
    }
    this.blueprint.formats.date = dateFormat;
    return this;
};

let _maxArray = function (max) {
    if (isNaN(max)) {
        throw new TypeError('Max array arguement must be a number.');
    }
    this.blueprint.array.max = max
    return this;
};

let _minArray = function (min) {
    if (isNaN(min)) {
        throw new TypeError('Max array arguement must be a number.');
    }
    this.blueprint.array.min = min
    return this;
};

let _logic = function (prop, callbackArray) {
    let callback = callbackArray.pop();
    if (!(callbackArray instanceof Function)) {
        throw new TypeError('Last item in callback array must be a function.'); 
    }

    this.blueprint.logic.push({
        property: prop,
        dependencies: callbackArray,
        callback: callback
    });
    return this;
};

module.exports = {
    Multiple: _multiple,
    Required: _required,
    NewType: _newType,
    DateFormat: _dateFormat,
    MaxArray: _maxArray,
    MinArray: _minArray,
    Logic: _logic
}