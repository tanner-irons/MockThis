'use strict';

import { MockTypes } from "../mockthis.types";
let Types = require('../mockthis.types.js');
let StringGenerator = require('./generator.string.js');
let NumberGenerator = require('./generator.number.js');
let NameGenerator = require('./generator.name.js');
let LocationGenerator = require('./generator.location');
let DateGenerator = require('./generator.date.js');
let UserDefGenerator = require('./generator.userDef.js');
let MiscGenerator = require('./generator.misc');

let TypesMap = new Map([
    [MockTypes.String.Word, StringGenerator.Word],
    [MockTypes.String.Sentence, StringGenerator.Sentence],
    [MockTypes.String.Paragraph, StringGenerator.Paragraph],
    [MockTypes.Location.Address, LocationGenerator.Address],
    [MockTypes.Location.City, LocationGenerator.City],
    [MockTypes.Location.Coordinates, LocationGenerator.Coordinates],
    [MockTypes.Location.State, LocationGenerator.State],
    [MockTypes.Location.ZipCode, LocationGenerator.ZipCode],
    [MockTypes.Location.Country, LocationGenerator.Country],
    [MockTypes.PhoneNumber, MiscGenerator.PhoneNumber],
    [MockTypes.Number, NumberGenerator.Number],
    [MockTypes.Name.First, NameGenerator.First],
    [MockTypes.Name.Last, NameGenerator.Last],
    [MockTypes.Date, DateGenerator.Date],
    [MockTypes.Birthday, DateGenerator.Birthday]
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