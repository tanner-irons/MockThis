'use strict';

import * as Types from '../mockthis.types.js';
import * as StringGenerator from './generator.string.js';
import * as NumberGenerator from './generator.number.js';
import * as NameGenerator from './generator.name.js';
import * as LocationGenerator from './generator.location';
import * as DateGenerator from './generator.date.js';
import * as UserDefGenerator from './generator.userDef.js';
import * as MiscGenerator from './generator.misc';

let TypesMap = new Map([
    [Types.String.Word, StringGenerator.Word],
    [Types.String.Sentence, StringGenerator.Sentence],
    [Types.String.Paragraph, StringGenerator.Paragraph],
    [Types.Location.Address, LocationGenerator.Address],
    [Types.Location.City, LocationGenerator.City],
    [Types.Location.Coordinates, LocationGenerator.Coordinates],
    [Types.Location.State, LocationGenerator.State],
    [Types.Location.ZipCode, LocationGenerator.ZipCode],
    [Types.Location.Country, LocationGenerator.Country],
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