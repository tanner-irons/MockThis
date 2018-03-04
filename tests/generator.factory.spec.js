define(['mockthis.types', 'generators/mockthis.generator.factory', 'generators/mockthis.generator.date', 'generators/mockthis.generator.name', 'generators/mockthis.generator.number', 'generators/mockthis.generator.string', 'chance'],
    function (Types, GeneratorFactory, DateGenerator, NameGenerator, NumberGenerator, StringGenerator, Chance) {
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

        });
    });