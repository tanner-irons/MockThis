'use strict';

let _ = require('lodash');
let GeneratorFactory = require('./generators/generator.factory.js');

let userDefinedTypes = require('./generators/generator.userDef').userDefTypes;

let _getArrayLength = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let _getDefaultType = function(type) {
    if (!userDefinedTypes[type]) {
        return GeneratorFactory.getInstanceOf(type);
    }
    throw new TypeError('Nested user-defined types are not allowed.');
}

let _generateObject = function (blueprint) {
    let arrayLength = _getArrayLength(blueprint.array.min, blueprint.array.max);
    let schema = blueprint.schema || {};
    let generatedValue, typeValue, isDefined, i, key, tempObject = {};

    for (key in schema) {
        isDefined = (blueprint.required.length === 0 ? 1 : Math.random()) >= .2;
        if (schema[key] instanceof Array) {
            tempObject[key] = [];
            for (i = 0; i < arrayLength; i++) {
                blueprint.schema = schema[key];
                tempObject[key].push(_generateObject(blueprint)[0]);
            }
        }
        else if (schema[key] instanceof Object) {
            blueprint.schema = schema[key];
            tempObject[key] = _generateObject(blueprint);
        }
        else {
            generatedValue = GeneratorFactory.getInstanceOf(schema[key]);
            typeValue = generatedValue instanceof Function ?  generatedValue(_getDefaultType): generatedValue;
            tempObject[key] = isDefined || blueprint.required.indexOf(key) > -1 ? typeValue : undefined;
        }
    }
    return tempObject;
};

let _generateData = function (blueprint) {
    let dataConfig = {
        schema: blueprint.schema,
        required: blueprint.required,
        array: blueprint.array
    }
    let tempArray = [];
    let i;
    for (i = 0; i < blueprint.total; i++) {
        tempArray.push(_generateObject(Object.assign({}, dataConfig)));
    }
    return tempArray.length > 1 ? tempArray : tempArray[0];
};

module.exports = {
    Object: function () {
        return _generateData(this.blueprint);
    },
    JSON: function () {
        return JSON.stringify(_generateData(this.blueprint));
    },
    Lodash: function () {
        return _.chain(_generateData(this.blueprint));
    }
}