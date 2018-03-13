define(['lodash', 'mockthis.types', 'generators/generator.factory'], function (_, Types, GeneratorFactory) {
    'use strict';

    let _generateObject = function (schema, required, arrayMax) {
        arrayMax = arrayMax || 10;
        let arrayLength = Math.round(Math.random() * arrayMax);
        let tempObject = {};
        let typeValue, generator, undefinedChance, i, key;

        for (key in schema) {
            undefinedChance = required.length === 0 ? 1 : Math.random();
            if (schema[key] instanceof Array) {
                tempObject[key] = [];
                for (i = 0; i < arrayLength; i++) {
                    tempObject[key].push(_generateObject(schema[key], required, arrayMax)[0]);
                }
            }
            else if (schema[key] instanceof Object) {
                tempObject[key] = _generateObject(schema[key], required, arrayMax);
            }
            else {
                generator = GeneratorFactory.getInstanceOf(schema[key]);
                typeValue = generator[schema[key]](GeneratorFactory.getInstanceOf);
                tempObject[key] = undefinedChance >= .2 || required.indexOf(key) > -1 ? typeValue : undefined;
            }
        }
        return tempObject;
    };

    let _generateData = function (blueprint) {
        let tempArray = [];
        for (let i = 0; i < blueprint.total; i++) {
            tempArray.push(_generateObject(blueprint.schema, blueprint.required, blueprint.arrayMax));
        }
        return tempArray.length > 1 ? tempArray : tempArray[0];
    };

    return {
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
});