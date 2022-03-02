'use strict';

const topsort = require('topsort');
const GeneratorFactory = require('./generators/generator.factory.js');

const _getArrayLength = function (min, max) {
    return max && min !== max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
};

const _getDefaultType = function (blueprint, callingName) {
    return function (type) {
        if (callingName && callingName === type) {
            throw new TypeError(`Cannot nest user-defined type: ${type} inside of itself.`);
        }
        return GeneratorFactory.getInstanceOf(type)(null, blueprint);
    }
}

const _generateValue = function (blueprint, prop, tempObject) {
    const item = blueprint.schema.find(item => item.property === prop);
    let factoryValue = GeneratorFactory.getInstanceOf(item.property);
    if (!factoryValue || item.dependencies.length < 1) {
        if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= blueprint.nullChance) {
            factoryValue = GeneratorFactory.getInstanceOf(item.type);
            return factoryValue(_getDefaultType(blueprint, factoryValue.userType), blueprint);
        }
        return null;
    }
    return factoryValue.call(null, _makeUnflat(tempObject));
};

const _sortSchema = function (blueprint) {
    const deps = [];
    blueprint.schema.forEach(prop => {
        deps.push(...prop.dependencies.reduce((acc, curr) => {
            if (prop.property.includes(curr)) {
                throw new Error(`Property "${prop.property}" has invalid dependency "${curr}". A property cannot depend on itself or the entirety of its ancestors.`)
            }
            acc.push([curr, prop.property]);
            return acc;
        }, [[prop.property]]));
    });
    return topsort(deps)
        .flatMap(dep => blueprint.schema.filter(item => item.property.includes(dep) || item.property.includes(dep + '.0')))
        .filter(dep => !!dep);
};

const _makeUnflat = function (schema) {
    let unflat = {};
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
        let current = unflat;
        let parts = keys[i].split('.');
        for (let j = 0; j < parts.length - 1; j++) {
            if (!current[parts[j]]) {
                current[parts[j]] = {};
            }
            current = current[parts[j]];
        }
        current[parts[parts.length - 1]] = schema[keys[i]];
    }

    return unflat;
}

let _generateObject = function (blueprint) {
    let tempObject = {};
    blueprint.sortedSchema.forEach(prop => {
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

    return _makeUnflat(tempObject);
};

let _generateData = function (blueprint) {
    const tempArray = [];
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