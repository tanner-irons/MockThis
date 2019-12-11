'use strict';

let unflatten = require('flat').unflatten;
let topsort = require('topsort');
let GeneratorFactory = require('./generators/generator.factory.js');

let _getArrayLength = function (min, max) {
    return max && min !== max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
};

let _getDefaultType = function (callingName) {
    return function (type) {
        if (callingName && callingName === type) {
            throw new TypeError('Cannot nest user-defined type: ' + type + ' inside of itself.');
        }
        return GeneratorFactory.getInstanceOf(type)();
    }
}

let _generateValue = function (blueprint, prop, tempObject) {
    let item = blueprint.schema.find(item => item.property === prop);
    if (item.dependencies.length < 1) {
        if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= .2) {
            let factoryValue = GeneratorFactory.getInstanceOf(item.type);
            return factoryValue(_getDefaultType(factoryValue.userType));
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
            let arrayLength = _getArrayLength(blueprint.array.min, blueprint.array.max);
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

function makeUnflat(schema) {
    let unflat = {};
    let keys = Object.keys(schema);
    for (var i = 0; i < keys.length - 1; i++) {
        let parts = keys[i].split('.');//reduceRight
        for (var j = 0; j < parts.length - 1; j++) {
            if (!unflat[parts[j]]) {
                unflat[parts[j]] = {}
                unflat = unflat[parts[j]]
            }
        }

        unflat[parts[parts.length - 1]] = schema[keys[i]];
    }
    return unflat;
}

let _generateData = function (blueprint) {
    let tempArray = [];
    blueprint.sortedSchema = _sortSchema(blueprint);
    let arrayLength = _getArrayLength(blueprint.total.min, blueprint.total.max);
    for (let i = 0; i < arrayLength; i++) {
        tempArray.push(_generateObject(blueprint));
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