define(['mockthis.types', 'generators/generator.string', 'generators/generator.number', 'generators/generator.name', 'generators/generator.date', 'generators/generator.userDef'],
    function (Types, StringGenerator, NumberGenerator, NameGenerator, DateGenerator, UserDefGenerator) {
        'use strict';

        return {
            getInstanceOf: function (type) {
                switch (type) {
                    case Types.String:
                    case Types.Text.Word:
                    case Types.Text.Sentence:
                    case Types.Text.Paragraph:
                        return StringGenerator
                    case Types.Number:
                        return NumberGenerator;
                    case Types.Name.First:
                    case Types.Name.Last:
                        return NameGenerator;
                    case Types.Date:
                    case Types.Birthday:
                        return DateGenerator;
                    default:
                        return UserDefGenerator.userDefTypes;
                }
            }
        }
    }); 