'use strict';

let _ = require('lodash');
let unflatten = require('flat').unflatten;
let topsort = require('topsort');

let GeneratorFactory = require('./generators/generator.factory.js');
// let userDefinedTypes = require('./generators/generator.userDef').userDefTypes;

let _getArrayLength = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let _getDefaultType = function (callingName) {
    return function (type) {
        if (callingName && callingName === type) {
            throw new TypeError('Cannot nest user-defined type: ' + type + ' inside user-defined type:' + type);
        }
        let instance = GeneratorFactory.getInstanceOf(type);
        return instance instanceof Function ? instance() : instance;
    }
}

let _generateValue = function (blueprint, prop, tempObject) {
    let item = blueprint.schema.find(item => item.property === prop);
    if (item.dependencies.length < 1) {
        let factoryValue = GeneratorFactory.getInstanceOf(item.type);
        if (factoryValue instanceof Function) {
            return factoryValue(_getDefaultType(factoryValue.userType));
        }
        if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= .2) {
            return factoryValue;
        }
    } else {
        let factoryValue = GeneratorFactory.getInstanceOf(item.property);
        let dependencies = item.dependencies.map((dep) => {
            return tempObject[dep];
        });
        return factoryValue.apply(null, dependencies);
    }

    return;
};

let _sortSchema = (blueprint) => {
    let deps = [];
    blueprint.schema.forEach((prop) => {
        if (prop.dependencies.length > 0) {
            prop.dependencies.forEach((dep) => deps.push([dep, prop.property]));
        } else {
            deps.push([prop.property]);
        }
    });
    let sortedDeps = topsort(deps);
    let sortedSchema = sortedDeps.map((dep) => {
        return blueprint.schema.find((item) => item.property === dep);
    });

    return sortedSchema;
};

let _generateObject = function (blueprint) {
    let tempObject = {};
    let generatedValue, arrayLength, i;
    let sortedSchema = _sortSchema(blueprint);

    sortedSchema.forEach((prop) => {
        if ((/.0/g).test(prop.property)) {
            arrayLength = blueprint.array.min !== blueprint.array.max ? _getArrayLength(blueprint.array.min, blueprint.array.max) : blueprint.array.min;
            for (i = 0; i < arrayLength; i++) {
                generatedValue = _generateValue(blueprint, prop.property, tempObject);
                let newKey = prop.property.replace(/0/g, i);
                generatedValue && (tempObject[newKey] = generatedValue);
            }
        } else {
            generatedValue = _generateValue(blueprint, prop.property, tempObject);
            generatedValue && (tempObject[prop.property] = generatedValue);
        }
    });

    return unflatten(tempObject);
};

let _generateData = function (blueprint) {
    let tempArray = [];
    let i;
    let arrayLength = blueprint.total.min !== blueprint.total.max ? _getArrayLength(blueprint.total.min, blueprint.total.max) : blueprint.total.min;
    for (i = 0; i < arrayLength; i++) {
        tempArray.push(_generateObject(Object.assign({}, blueprint)));
    }
    return tempArray.length > 1 ? tempArray : tempArray[0];
};

module.exports = {
    Object: function () {
        return _generateData(this.blueprint);
    },
    JSON: function (replacer, space) {
        return JSON.stringify(_generateData(this.blueprint), replacer, space);
    },
    Lodash: function () {
        return _.chain(_generateData(this.blueprint));
    }
}