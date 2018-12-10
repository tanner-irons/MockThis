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

    it('should call Chance date function when getInstanceOf() is called with type of Date', function () {
        spyOn(DateGenerator, 'Date').and.callThrough();
        let date = GeneratorFactory.getInstanceOf(Types.Date);
        expect(DateGenerator.Date).toHaveBeenCalled();
    });

    it('should call Chance birthday function when getInstanceOf() is called with type of Birthday', function () {
        spyOn(DateGenerator, 'Birthday').and.callThrough();
        let birthday = GeneratorFactory.getInstanceOf(Types.Birthday);
        expect(DateGenerator.Birthday).toHaveBeenCalled();
    });

    it('should call Chance first name function when getInstanceOf() is called with type of Name.First', function () {
        spyOn(NameGenerator, 'First').and.callThrough();
        let firstName = GeneratorFactory.getInstanceOf(Types.Name.First);
        expect(NameGenerator.First).toHaveBeenCalled();
    });

    it('should call Chance last name function when getInstanceOf() is called with type of Name.Last', function () {
        spyOn(NameGenerator, 'Last').and.callThrough();
        let lastName = GeneratorFactory.getInstanceOf(Types.Name.Last);
        expect(NameGenerator.Last).toHaveBeenCalled();
    });

    it('should call Chance number function when getInstanceOf() is called with type of Number', function () {
        spyOn(NumberGenerator, 'Number').and.callThrough();
        let number = GeneratorFactory.getInstanceOf(Types.Number);
        expect(NumberGenerator.Number).toHaveBeenCalled();
    });

    it('should call Chance Word function when getInstanceOf() is called with type of Text.Word', function () {
        spyOn(StringGenerator, 'Word').and.callThrough();
        let word = GeneratorFactory.getInstanceOf(Types.Text.Word);
        expect(StringGenerator.Word).toHaveBeenCalled();
    });

    it('should call Chance Sentence function when getInstanceOf() is called with type of Text.Sentence', function () {
        spyOn(StringGenerator, 'Sentence').and.callThrough();
        let sentence = GeneratorFactory.getInstanceOf(Types.Text.Sentence);
        expect(StringGenerator.Sentence).toHaveBeenCalled();
    });

    it('should call Chance Paragraph function when getInstanceOf() is called with type of Text.Paragraph', function () {
        spyOn(StringGenerator, 'Paragraph').and.callThrough();
        let paragraph = GeneratorFactory.getInstanceOf(Types.Text.Paragraph);
        expect(StringGenerator.Paragraph).toHaveBeenCalled();
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