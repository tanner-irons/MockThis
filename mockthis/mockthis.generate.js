define(['mockthis.types', 'mockthis.generator.factory'], function (Types, GeneratorFactory) {
    'use strict';

    let _generateType = function (type) {
        let Generator = GeneratorFactory.getInstanceOf(type);
        switch (type) {
            case Types.Name.First:
                return Generator.getFirstName();
            case Types.Date:
                return Generator.getDate();
            case Types.String:
                return;
            default:
                return undefined;
        }
    };

    let _generateData = function (_blueprint) {

        let tempObject;
        tempObject = [];
        for (let i = 0; i < _blueprint.total; i++) {
            tempObject.push({});
            for (let key in _blueprint.schema) {
                let chance = Math.random();
                tempObject[i][key] = chance >= .2 || _blueprint.required.indexOf(key) > -1 ? _generateType(_blueprint.schema[key]) : undefined;
            }
        }

        return tempObject.length > 1 ? tempObject : tempObject[0];
    }

    return {
        generateType: _generateType,
        generateData: _generateData
    }
});