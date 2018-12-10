'use strict';

let moment = require('moment');

let UserDefGenerator = require('./generators/generator.userDef.js');

let _multiple = function (amount, max) {
    if (isNaN(amount)) {
        throw new TypeError('Multiple argument must be an integer.')
    }
    this.blueprint.total = { min: amount, max: max || amount };
    return this;
};

let _required = function (required) {
    if (!(required instanceof Array)) {
        throw new TypeError('Required properties must be an array.')
    }
    if (this.blueprint.required.length > 0) {
        console.warn('Required properties have already been declared. Please call required method only once.');
        return this;
    }
    this.blueprint.required = required;
    return this;
};

let _optional = function (optional) {
    if (!(optional instanceof Array)) {
        throw new TypeError('Optional properties must be an array.')
    }
    if (this.blueprint.optional.length > 0) {
        console.warn('Optional properties have already been declared. Please call optional method only once.');
        return this;
    }
    this.blueprint.optional = optional;
    return this;
};

let _newType = function (newType, callback) {
    if (typeof newType != 'string') {
        throw new TypeError('User defined property name must be a string.')
    }
    if (!(callback instanceof Function)) {
        throw new TypeError('User defined property callback must be a function.')
    }
    callback.userType = newType;
    UserDefGenerator.addType(newType, callback);
    return this;
};

let _newRandom = function (newRandom, items) {
    let randomCallback = function () {
        let random = Math.floor(Math.random() * items.length);
        return items[random]
    }
    return _newType.call(this, newRandom, randomCallback);
};

let _dateFormat = function (dateFormat) {
    // if (!(moment((new Date()).toISOString(), dateFormat).isValid())) {
    //     throw new TypeError('Date format argument must be a valid date format.');
    // }
    this.blueprint.formats.date = dateFormat;
    return this;
};

let _arrayLength = function (min, max) {
    if (isNaN(min)) {
        throw new TypeError('Min array argument must be a number.');
    }
    if (max && isNaN(max)) {
        throw new TypeError('Max array argument must be a number.');
    }
    this.blueprint.array = {
        min: min,
        max: max || min
    };
    return this;
};

let _logic = function (prop, callbackArray) {
    let callback = callbackArray.pop();
    if (!(callback instanceof Function)) {
        throw new TypeError('Last item in callback array must be a function.');
    }

    let item = this.blueprint.schema.find((item) => item.property === prop || item.property === prop + '.0');
    if (!item) {
        throw new Error('Property ' + item.property + ' does not exist');
    }
    if ((/.0/g).test(item.property)) {
        UserDefGenerator.addType(prop + '.0', callback);
    }
    else {
        UserDefGenerator.addType(prop, callback);
    }
    callbackArray.length && (item.dependencies = callbackArray);

    return this;
};

module.exports = {
    Multiple: _multiple,
    Required: _required,
    Optional: _optional,
    NewType: _newType,
    NewRandom: _newRandom,
    DateFormat: _dateFormat,
    ArrayLength: _arrayLength,
    Logic: _logic
}