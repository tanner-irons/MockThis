define(['mockthis.types', 'generators/mockthis.generator.string', 'generators/mockthis.generator.number', 'generators/mockthis.generator.name', 'generators/mockthis.generator.date'],
    function (Types, StringGenerator, NumberGenerator, NameGenerator, DateGenerator) {
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
                        return;
                }
            }
        }
    });