'use strict';

import { MockThis } from ".";

const UserDefGenerator = require('./generators/generator.userDef.js');
const moment = require('moment');

const _newType = function<T>(this: MockThis<T>, newType, callback): MockThis<T> {
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

const _random = function<T>(this: MockThis<T>, randomName, items): MockThis<T> {
    let randomCallback = () => {
        let random = Math.floor(Math.random() * items.length);
        return items[random]
    }
    return _newType.call(this, randomName, randomCallback);
};

const sequenceGenerator = function* (items) {
    let index = 0;
    while (true) {
        if (!items[index]) {
            return;
        }
        yield items[index];
        index++;
    }
}

const _sequence = function<T>(this: MockThis<T>, sequenceName, items): MockThis<T> {
    let sequence = sequenceGenerator(items);

    return _newType.call(this, sequenceName, () => {
        const result = sequence.next();
        if (result.done) {
            sequence = sequenceGenerator(items);
            return sequence.next().value;
        }
        return result.value;
    });
}

const _dependencies = function<T>(this: MockThis<T>, prop, deps, callback): MockThis<T> {
    if (!(deps instanceof Array)) {
        throw new Error('Please add dependency array or use the NewType method.');
    }
    if (callback && !(callback instanceof Function)) {
        throw new TypeError('Callback must be a function.');
    }
    let item = this.blueprint.schema.find(item => item.property === prop || item.property === prop + '.0');
    if (!item) {
        throw new Error(`Property: ${item.property} does not exist.`);
    }
    callback && _newType.call(this, prop, callback);
    deps.length && (item.dependencies = deps);

    return this;
};

const _multiple = function<T>(this: MockThis<T>, min, max): MockThis<T> {
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

const _arrayLength = function<T>(this: MockThis<T>, min, max): MockThis<T> {
    if (isNaN(min)) {
        throw new TypeError('Min argument must be a number.');
    }
    else if (min < 0) {
        throw new Error('Min argument must be a postive integer or 0.');
    }
    else if (max && isNaN(max)) {
        throw new TypeError('Max argument must be a number.');
    }
    else if (max && max < 0) {
        throw new Error('Max argument must be a postive integer or 0.');
    }
    this.blueprint.array = {
        min: min,
        max: max || min
    };
    return this;
};

const _required = function<T>(this: MockThis<T>, required): MockThis<T> {
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

const _dateFormat = function<T>(this: MockThis<T>, dateFormat): MockThis<T> {
    if (moment().format(dateFormat).toString() === 'InvalidDate') {
        throw new TypeError('Date format argument must be a valid date format.');
    }
    this.blueprint.formats.date = dateFormat;
    return this;
};

const _nullChance = function<T>(this: MockThis<T>, nullChance): MockThis<T> {
    if (isNaN(nullChance)) {
        throw new TypeError('Null chance argument must be a number.');
    }
    if (nullChance < 0 || nullChance > 1) {
        throw new Error('Null chance argument must be a number between 0 and 1.');
    }
    this.blueprint.nullChance = nullChance;
    return this;
};

export const Multiple = _multiple;
export const Required = _required;
export const NewType = _newType;
export const Random = _random;
export const Sequence = _sequence;
export const DateFormat = _dateFormat;
export const ArrayLength = _arrayLength;
export const Dependencies = _dependencies;
export const NullChance = _nullChance;

export interface IWith {
    Multiple: typeof _multiple;
    Required: typeof _required;
    NewType: typeof _newType;
    Random: typeof _random;
    Sequence: typeof _sequence;
    DateFormat: typeof _dateFormat;
    ArrayLength: typeof _arrayLength;
    Dependencies: typeof _dependencies;
    NullChance: typeof _nullChance;
}