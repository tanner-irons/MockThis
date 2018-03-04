define(['chance'], function (Chance) {
    'use strict';

    let chance = new Chance();

    let _getFirstName = function () {
        return chance.first();
    };

    let _getLastName = function () {
        return chance.last();
    }

    return {
        getFirstName: _getFirstName,
        getLastName: _getLastName
    }
});