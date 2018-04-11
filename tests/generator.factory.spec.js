'use strict';

let GeneratorFactory = require('../mockthis/lib/generators/generator.factory.js');
let DateGenerator = require('../mockthis/lib/generators/generator.date.js');
let NameGenerator = require('../mockthis/lib/generators/generator.name.js');
let NumberGenerator = require('../mockthis/lib/generators/generator.number.js');
let StringGenerator = require('../mockthis/lib/generators/generator.string.js');
let UserDefGenerator = require('../mockthis/lib/generators/generator.userDef.js');
let Types = require('../mockthis/lib/mockthis.types');
let Chance = require('chance');

describe('Generator Factory', function () {

    it('should return a DateGenerator object when getInstanceOf() is called with type of Date', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Date);
        expect(Generator).toEqual(DateGenerator);
    });

    it('should return a DateGenerator object when getInstanceOf() is called with type of Birthday', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Birthday);
        expect(Generator).toEqual(DateGenerator);
    });

    it('should return a NameGenerator object when getInstanceOf() is called with type of Name.First', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Name.First);
        expect(Generator).toEqual(NameGenerator);
    });

    it('should return a NameGenerator object when getInstanceOf() is called with type of Name.Last', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Name.Last);
        expect(Generator).toEqual(NameGenerator);
    });

    it('should return a NumberGenerator object when getInstanceOf() is called with type of Number', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Number);
        expect(Generator).toEqual(NumberGenerator);
    });

    it('should return a StringGenerator object when getInstanceOf() is called with type of Text.Word', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Text.Word);
        expect(Generator).toEqual(StringGenerator);
    });

    it('should return a StringGenerator object when getInstanceOf() is called with type of Text.Sentence', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Text.Sentence);
        expect(Generator).toEqual(StringGenerator);
    });

    it('should return a StringGenerator object when getInstanceOf() is called with type of Text.Paragraph', function () {
        let Generator = GeneratorFactory.getInstanceOf(Types.Text.Paragraph);
        expect(Generator).toEqual(StringGenerator);
    });

    it('should return UserDefGenerator when getInstanceOf() is called with no type', function () {
        let Generator = GeneratorFactory.getInstanceOf();
        expect(Generator).toEqual(UserDefGenerator.userDefTypes);
    });

    it('should return a UserDefGenerator object when getInstanceOf() is called with custom type', function () {
        let Generator = GeneratorFactory.getInstanceOf('Animal');
        expect(Generator).toEqual(UserDefGenerator.userDefTypes);
    });

});