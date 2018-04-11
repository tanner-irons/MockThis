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