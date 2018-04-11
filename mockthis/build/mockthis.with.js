'use strict';

let UserDefGenerator = require('./generators/generator.userDef.js');

let _multiple = function (amount) {
    this.blueprint.total = amount;
    return this;
};

let _required = function (required) {
    this.blueprint.required = required;
    return this;
};

let _newType = function (newType, callback) {
    UserDefGenerator.addType(newType, callback);
    return this;
};

let _dateFormat = function (asString) {
    this.blueprint.formats.date = asString;
    return this;
};

let _maxArray = function (max, strict) {
    this.blueprint.array = {
        max: max,
        strict: strict
    };
    return this;
};

let _logic = function () {

};

module.exports = {
    Multiple: _multiple,
    Required: _required,
    NewType: _newType,
    DateFormat: _dateFormat,
    MaxArray: _maxArray,
    Logic: _logic
}