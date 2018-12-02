'use strict';

let Types = require('../mockthis.types.js');
let StringGenerator = require('./generator.string.js');
let NumberGenerator = require('./generator.number.js');
let NameGenerator = require('./generator.name.js');
let LocationGenerator = require('./generator.location');
let DateGenerator = require('./generator.date.js');
let UserDefGenerator = require('./generator.userDef.js');
let MiscGenerator = require('./generator.misc');

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
            case Types.Location.Address:
                return LocationGenerator.Address();
            case Types.Location.City:
                return LocationGenerator.City();
            case Types.Location.Coordinates:
                return LocationGenerator.Coordinates();
            case Types.Location.State:
                return LocationGenerator.State();
            case Types.Location.ZipCode:
                return LocationGenerator.ZipCode();
            case Types.PhoneNumber:
                return MiscGenerator.PhoneNumber();
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