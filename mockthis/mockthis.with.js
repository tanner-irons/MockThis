define([], function () {
    'use strict';

    let _multiple = function (amount) {
        if (amount === this.blueprint.schema.length) {
            return this;
        }
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

    let _dateFormat = function(dateFormat) {
        this.blueprint.formats.date = dateFormat;
        return this;
    }

    return {
        Multiple: _multiple,
        Required: _required,
        NewType: _newType,
        DateFormat: _dateFormat
    }
});