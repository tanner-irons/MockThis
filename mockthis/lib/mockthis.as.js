'use strict';

let _ = require('lodash');
let GeneratorFactory = require('./generators/generator.factory.js');

let _generateObject = function (blueprint) {
    let arrayLength = blueprint.array.strict ? blueprint.array.max : Math.round(Math.random() * blueprint.array.max);
    arrayLength = arrayLength < blueprint.array.min ? blueprint.array.min : arrayLength;
    let schema = blueprint.schema || {};
    let tempObject = {};
    let typeValue, generator, undefinedChance, i, key;

    for (key in schema) {
        undefinedChance = blueprint.required.length === 0 ? 1 : Math.random();
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
            generator = GeneratorFactory.getInstanceOf(schema[key]);
            typeValue = generator[schema[key]](GeneratorFactory.getInstanceOf);
            tempObject[key] = undefinedChance >= .2 || blueprint.required.indexOf(key) > -1 ? typeValue : undefined;
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