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

    beforeEach(() => {
        spyOn(GeneratorFactory.typesMap, 'get').and.callThrough();
    });

    it('should call Chance date function when getInstanceOf() is called with type of Date', function () {
        let date = GeneratorFactory.getInstanceOf(Types.Date);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Date);
    });

    it('should call Chance birthday function when getInstanceOf() is called with type of Birthday', function () {
        let birthday = GeneratorFactory.getInstanceOf(Types.Birthday);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Birthday);
    });

    it('should call Chance first name function when getInstanceOf() is called with type of Name.First', function () {
        let firstName = GeneratorFactory.getInstanceOf(Types.Name.First);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Name.First);
    });

    it('should call Chance last name function when getInstanceOf() is called with type of Name.Last', function () {
        let lastName = GeneratorFactory.getInstanceOf(Types.Name.Last);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Name.Last);
    });

    it('should call Chance number function when getInstanceOf() is called with type of Number', function () {
        let number = GeneratorFactory.getInstanceOf(Types.Number);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Number);
    });

    it('should call Chance Word function when getInstanceOf() is called with type of Text.Word', function () {
        let word = GeneratorFactory.getInstanceOf(Types.Text.Word);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Text.Word);
    });

    it('should call Chance Sentence function when getInstanceOf() is called with type of Text.Sentence', function () {
        let sentence = GeneratorFactory.getInstanceOf(Types.Text.Sentence);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Text.Sentence);
    });

    it('should call Chance Paragraph function when getInstanceOf() is called with type of Text.Paragraph', function () {
        let paragraph = GeneratorFactory.getInstanceOf(Types.Text.Paragraph);
        expect(GeneratorFactory.typesMap.get).toHaveBeenCalledWith(Types.Text.Paragraph);
    });

    it('should return null when getInstanceOf() is called with no type', function () {
        let Generator = GeneratorFactory.getInstanceOf();
        expect(Generator).toBeNull();
    });

    it('should return a UserDefGenerator object when getInstanceOf() is called with custom type', function () {
        UserDefGenerator.addType('Animal', () => {});
        spyOn(UserDefGenerator.userDefTypes, 'Animal').and.callThrough();
        let animal = GeneratorFactory.getInstanceOf('Animal')();
        expect(UserDefGenerator.userDefTypes.Animal).toHaveBeenCalled();
    });

});