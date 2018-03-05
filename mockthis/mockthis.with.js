define([], function () {
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
        this.blueprint.userDefTypes.push({ type: newType, callback: callback });
        return this;
    }

    let _dateFormat = function (asString) {
        this.blueprint.formats.date = asString;
        return this;
    }

    let _arrayMax = function (max) {
        this.blueprint.arrayMax = max;
        return this;
    }

    return {
        Multiple: _multiple,
        Required: _required,
        NewType: _newType,
        DateFormat: _dateFormat,
        ArrayMax: _arrayMax
    }
});