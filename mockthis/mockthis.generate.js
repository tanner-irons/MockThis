define(['mockthis.types', 'mockthis.generator.factory'], function (Types, GeneratorFactory) {
    'use strict';

    let _generateType = function (type, userDefTypes) {
        let Generator = GeneratorFactory.getInstanceOf(type);
        switch (type) {
            case Types.Name.First:
                return Generator.getFirstName();
            case Types.Date:
                return Generator.getDate();
            case Types.String:
                return "I'm a string.";
            default:
                for (let i = 0; i < userDefTypes.length; i++) {
                    if (userDefTypes[i].type === type) {
                        return userDefTypes[i].callback();
                    }
                };
                return;
        }
    };

    let _generateObject = function (schema, required, userDefTypes) {
        let tempObject = {};
        for (let key in schema) {
            let chance = required.length === 0 ? 1 : Math.random();
            if (typeof schema[key] === 'object') {
                tempObject[key] = _generateObject(schema[key], required, userDefTypes);
            }
            else {
                tempObject[key] = chance >= .2 || required.indexOf(key) > -1 ? _generateType(schema[key], userDefTypes) : undefined;
            }
        }

        return tempObject;
    };

    let _generateData = function (_blueprintRef) {
        let tempArray = [];
        for (let i = 0; i < _blueprintRef.total; i++) {
            tempArray.push(_generateObject(_blueprintRef.schema, _blueprintRef.required, _blueprintRef.userDefTypes));
        }

        return tempArray.length > 1 ? tempArray : tempArray[0];
    }

    return {
        generateType: _generateType,
        generateData: _generateData
    }
});