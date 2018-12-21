'use strict';

let UserDefGenerator = require('./generators/generator.userDef.js');

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
    let randomCallback = () => {
        let random = Math.floor(Math.random() * items.length);
        return items[random]
    }
    return _newType.call(this, newRandom, randomCallback);
};

let _logic = function (prop, deps) {
    if (deps instanceof Function) {
        throw new Error('Please add depedency array or use the NewType method.');
    }
    let callback = deps.pop();
    if (!(callback instanceof Function)) {
        throw new TypeError('Last argument in the dependency array must be a function.');
    }
    let item = this.blueprint.schema.find((item) => item.property === prop || item.property === prop + '.0');
    if (!item) {
        throw new Error('Property: ' + item.property + ' does not exist');
    }
    _newType.call(this, prop, callback);
    deps.length && (item.dependencies = deps);

    return this;
};

let _multiple = function (min, max) {
    if (isNaN(min)) {
        throw new TypeError('Min argument must be a number.');
    }
    else if (min < 0) {
        throw new Error('Min argument must be a postive integer or 0.');
    }
    else if (max && isNaN(max)) {
        throw new TypeError('Max argument must be a number.');
    }
    else if (max < 0) {
        throw new Error('Max argument must be a postive integer or 0.');
    }
    this.blueprint.total = { 
        min: min, 
        max: max || min 
    };
    return this;
};

let _arrayLength = function (min, max) {
    if (isNaN(min)) {
        throw new TypeError('Min argument must be a number.');
    }
    else if (min < 0) {
        throw new Error('Min argument must be a postive integer or 0.');
    }
    else if (max && isNaN(max)) {
        throw new TypeError('Max argument must be a number.');
    }
    else if (max < 0) {
        throw new Error('Max argument must be a postive integer or 0.');
    }
    this.blueprint.array = {
        min: min,
        max: max || min
    };
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

let _dateFormat = function (dateFormat) {
    // if (!(moment((new Date()).toISOString(), dateFormat).isValid())) {
    //     throw new TypeError('Date format argument must be a valid date format.');
    // }
    this.blueprint.formats.date = dateFormat;
    return this;
};

module.exports = {
    Multiple: _multiple,
    Required: _required,
    NewType: _newType,
    NewRandom: _newRandom,
    DateFormat: _dateFormat,
    ArrayLength: _arrayLength,
    Logic: _logic
}