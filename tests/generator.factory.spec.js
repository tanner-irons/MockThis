define(['mockthis.types', 'generators/generator.factory', 'generators/generator.date', 'generators/generator.name', 'generators/generator.number', 'generators/generator.string', 'generators/generator.userDef', 'chance'],
    function (Types, GeneratorFactory, DateGenerator, NameGenerator, NumberGenerator, StringGenerator, UserDefGenerator, Chance) {
        'use strict';

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

            it('should return a UserDefGenerator object when getInstanceOf() is called with custom type', function() {
                let Generator = GeneratorFactory.getInstanceOf('Animal');
                expect(Generator).toEqual(UserDefGenerator.userDefTypes);
            });

        });
    });