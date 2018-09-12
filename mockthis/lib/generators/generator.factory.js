'use strict';

let Types = require('../mockthis.types.js');
let StringGenerator = require('./generator.string.js');
let NumberGenerator = require('./generator.number.js');
let NameGenerator = require('./generator.name.js');
let DateGenerator = require('./generator.date.js');
let UserDefGenerator = require('./generator.userDef.js');

module.exports = {
    getInstanceOf: function (type) {
        switch (type) {
            case Types.String:
                return StringGenerator.Sentence();
            case Types.Text.Word:
                return StringGenerator.Word();
            case Types.Text.Sentence:
                return StringGenerator.Sentence();
            case Types.Text.Paragraph:
                return StringGenerator.Paragraph();
            case Types.Number:
                return NumberGenerator.Number();
            case Types.Name.First:
                return NameGenerator.First();
            case Types.Name.Last:
                return NameGenerator.Last();
            case Types.Date:
                return DateGenerator.Date();
            case Types.Birthday:
                return DateGenerator.Birthday();
            default:
                return UserDefGenerator.userDefTypes[type];
        }
    }
}