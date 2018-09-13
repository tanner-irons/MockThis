'use strict';

let _ = require('lodash');
let unflatten = require('flat').unflatten;

let GeneratorFactory = require('./generators/generator.factory.js');
let userDefinedTypes = require('./generators/generator.userDef').userDefTypes;

let _getArrayLength = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let _getDefaultType = function (type) {
    if (!userDefinedTypes[type]) {
        return GeneratorFactory.getInstanceOf(type);
    }
    throw new TypeError('Nested user-defined types are not allowed.');
};

let _generateValue = function (blueprint, prop) {
    let factoryValue = GeneratorFactory.getInstanceOf(blueprint.schema[prop]);
    if (factoryValue instanceof Function) {
        return factoryValue(_getDefaultType);
    }
    if (blueprint.required.includes(prop) || Math.random() >= .2) {
        return factoryValue;
    }
    return;
};

let _generateObject = function (blueprint) {
    let tempObject = {};
    let generatedValue, formattedProp, arrayLength, i;

    let dependentProps = blueprint.logic.map((logic) => logic.property.replace(/[[]/, '0').replace(/[\]]/, ''));

    Object.keys(blueprint.schema).forEach((prop) => {
        if ((/.0/g).test(prop)) {
            arrayLength = _getArrayLength(blueprint.array.min, blueprint.array.max);
            for (i = 0; i < arrayLength; i++) {
                formattedProp = prop.replace(/[[]/, '0').replace(/[\]]/, '');
                generatedValue = _generateValue(blueprint, formattedProp);
                let newKey = prop.replace(/0/g, i);
                generatedValue && (tempObject[newKey] = generatedValue);

            }
        }

        formattedProp = prop.replace(/[[]/, '0').replace(/[\]]/, '');
        generatedValue = _generateValue(blueprint, formattedProp);
        generatedValue && (tempObject[formattedProp] = generatedValue);
    });

    dependentProps.forEach((prop) => {
        formattedProp = prop.replace(/[[]/, '0').replace(/[\]]/, '').replace(/.0$/g, '');
        let propValue = tempObject[formattedProp];
        if (propValue instanceof Array) {
            propValue.forEach((prop, index) => {
                let logicPlan = blueprint.logic.find((logic) => {
                    return logic.property = prop;
                });
                let dependencies = logicPlan.dependencies.map((dep) => {
                    return tempObject[dep.replace(/0/, index)];
                });
                tempObject[formattedProp][index] = logicPlan.callback.apply(null, dependencies);
            });
        }
        else {
            let logicPlan = blueprint.logic.find((logic) => {
                return logic.property = prop;
            });
            let dependencies = logicPlan.dependencies.map((dep) => {
                return tempObject[dep];
            });
            tempObject[formattedProp] = logicPlan.callback.apply(null, dependencies);
        }
    });

    return unflatten(tempObject);
};

let _generateData = function (blueprint) {
    let tempArray = [];
    let i;
    for (i = 0; i < blueprint.total; i++) {
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