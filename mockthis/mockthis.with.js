define(['generators/generator.userDef'], function (UserDefGenerator) {
    'use strict';

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

    let _arrayMax = function (max, strict) {
        this.blueprint.arrays = {
            max: max,
            strict: strict
        };
        return this;
    };

    let _logic = function() {
        
    };

    return {
        Multiple: _multiple,
        Required: _required,
        NewType: _newType,
        DateFormat: _dateFormat,
        ArrayMax: _arrayMax,
        Logic: _logic
    }
});