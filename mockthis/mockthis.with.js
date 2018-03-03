define([], function () {
    'use strict';

    let _multiple = function (amount) {
        if (amount === this.blueprint.schema.length) {
            return this;
        }
        this.blueprint.total = amount;
        return this;
    };

    let _required = function(required) {
        this.blueprint.required = required;
        return this;
    };

    return {
        Multiple: _multiple,
        Required: _required
    }
});