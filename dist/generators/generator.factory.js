'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var Types = _interopRequireWildcard(require("../mockthis.types.js"));

var StringGenerator = _interopRequireWildcard(require("./generator.string.js"));

var NumberGenerator = _interopRequireWildcard(require("./generator.number.js"));

var NameGenerator = _interopRequireWildcard(require("./generator.name.js"));

var LocationGenerator = _interopRequireWildcard(require("./generator.location"));

var DateGenerator = _interopRequireWildcard(require("./generator.date.js"));

var UserDefGenerator = _interopRequireWildcard(require("./generator.userDef.js"));

var MiscGenerator = _interopRequireWildcard(require("./generator.misc"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TypesMap = new Map([[Types.String.Word, StringGenerator.Word], [Types.String.Sentence, StringGenerator.Sentence], [Types.String.Paragraph, StringGenerator.Paragraph], [Types.Location.Address, LocationGenerator.Address], [Types.Location.City, LocationGenerator.City], [Types.Location.Coordinates, LocationGenerator.Coordinates], [Types.Location.State, LocationGenerator.State], [Types.Location.ZipCode, LocationGenerator.ZipCode], [Types.Location.Country, LocationGenerator.Country], [Types.PhoneNumber, MiscGenerator.PhoneNumber], [Types.Number, NumberGenerator.Number], [Types.Name.First, NameGenerator.First], [Types.Name.Last, NameGenerator.Last], [Types.Date, DateGenerator.Date], [Types.Birthday, DateGenerator.Birthday]]);
module.exports = {
  typesMap: TypesMap,
  getInstanceOf: function getInstanceOf(type) {
    if (type) {
      return TypesMap.has(type) ? TypesMap.get(type) : UserDefGenerator.userDefTypes[type];
    }

    return null;
  }
};