'use strict';

let unflatten = require('flat').unflatten;
let topsort = require('topsort');
let GeneratorFactory = require('./generators/generator.factory.js');

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
        if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= .2) {
            if (factoryValue instanceof Function) {
                return factoryValue(_getDefaultType(factoryValue.userType));
            }
            return factoryValue;
        }
        return null;
    }

    let dependencies = item.dependencies.map((dep) => {
        return tempObject[dep];
    });
    
    return GeneratorFactory.getInstanceOf(item.property).apply(null, dependencies);
};

let _sortSchema = function (blueprint) {
    let deps = [];
    blueprint.schema.forEach((prop) => {
        deps.push(...prop.dependencies.reduce((acc, curr) => {
            acc.push([curr, prop.property]);
            return acc;
        }, [[prop.property]]));
    });

    return topsort(deps).map((dep) => {
        return blueprint.schema.find((item) => item.property === dep || item.property === dep + '.0');
    });
};

let _generateObject = function (blueprint) {
    let tempObject = {};
    blueprint.sortedSchema.forEach((prop) => {
        let generatedValue;
        if ((/.0/g).test(prop.property)) {
            let arrayLength = blueprint.array.min !== blueprint.array.max ? _getArrayLength(blueprint.array.min, blueprint.array.max) : blueprint.array.min;
            for (let i = 0; i < arrayLength; i++) {
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
    let arrayLength = blueprint.total.min !== blueprint.total.max ? _getArrayLength(blueprint.total.min, blueprint.total.max) : blueprint.total.min;
    blueprint.sortedSchema = _sortSchema(blueprint);
    for (let i = 0; i < arrayLength; i++) {
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
    }
}