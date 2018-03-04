define(['mockthis.types', 'generators/mockthis.generator.factory'], function (Types, GeneratorFactory) {
    'use strict';

    let _generateType = function (type) {
        let Generator = GeneratorFactory.getInstanceOf(type);
        switch (type) {
            case Types.String:
                return Generator.getString();
            case Types.Text.Word:
                return Generator.getWord();
            case Types.Text.Sentence:
                return Generator.getSentence();
            case Types.Text.Paragraph:
                return Generator.getParagraph();
            case Types.Number:
                return Generator.getNumber();
            case Types.Name.First:
                return Generator.getFirstName();
            case Types.Name.Last:
                return Generator.getLastName();
            case Types.Date:
                return Generator.getDate();
            case Types.Birthday:
                return Generator.getBirthday();
            default:
                for (let i = 0; i < this.blueprint.userDefTypes.length; i++) {
                    if (this.blueprint.userDefTypes[i].type === type) {
                        return this.blueprint.userDefTypes[i].callback(type);
                    }
                };
                return;
        }
    };

    let _generateObject = function (schema) {
        let arrayMax = this.blueprint.arrayMax || 10;
        let tempObject = {};
        for (let key in schema) {
            let chance = this.blueprint.required.length === 0 ? 1 : Math.random();
            if (schema[key] instanceof Array) {
                let arrayLength = Math.round(Math.random() * arrayMax);
                tempObject[key] = [];
                for (let i = 0; i < arrayLength; i++) {
                    tempObject[key].push(_generateObject.bind(this, schema[key])()[0]);
                }
            }
            else if (schema[key] instanceof Object) {
                tempObject[key] = _generateObject.bind(this, schema[key])();
            }
            else {
                tempObject[key] = chance >= .2 || this.blueprint.required.indexOf(key) > -1 ? _generateType.bind(this, schema[key])() : undefined;
            }
        }

        return tempObject;
    };

    let _generateData = function () {
        let tempArray = [];
        for (let i = 0; i < this.blueprint.total; i++) {
            tempArray.push(_generateObject.bind(this, this.blueprint.schema)());
        }

        return tempArray.length > 1 ? tempArray : tempArray[0];
    }

    return {
        generateType: _generateType,
        generateData: _generateData
    }
});