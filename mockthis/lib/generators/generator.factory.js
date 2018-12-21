'use strict';

let Types = require('../mockthis.types.js');
let StringGenerator = require('./generator.string.js');
let NumberGenerator = require('./generator.number.js');
let NameGenerator = require('./generator.name.js');
let LocationGenerator = require('./generator.location');
let DateGenerator = require('./generator.date.js');
let UserDefGenerator = require('./generator.userDef.js');
let MiscGenerator = require('./generator.misc');

let TypesMap = new Map([
    [Types.String.Word, StringGenerator.Word],
    [Types.String.Sentence, StringGenerator.Sentence],
    [Types.String.Paragraph, StringGenerator.Paragraph],
    [Types.Location.Address, LocationGenerator.Address],
    [Types.Location.City, LocationGenerator.City],
    [Types.Location.Coordinates, LocationGenerator.Coordinates],
    [Types.Location.State, LocationGenerator.State],
    [Types.Location.ZipCode, LocationGenerator.ZipCode],
    [Types.PhoneNumber, MiscGenerator.PhoneNumber],
    [Types.Number, NumberGenerator.Number],
    [Types.Name.First, NameGenerator.First],
    [Types.Name.Last, NameGenerator.Last],
    [Types.Date, DateGenerator.Date],
    [Types.Birthday, DateGenerator.Birthday]
]);

module.exports = {
    typesMap: TypesMap,
    getInstanceOf: function (type) {
        if (type) {
            return TypesMap.has(type) ? TypesMap.get(type) : UserDefGenerator.userDefTypes[type];
        }
        return null;
    }
}