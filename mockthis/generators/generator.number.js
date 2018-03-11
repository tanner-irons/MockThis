define(['chance'], function (Chance) {
    'use strict';

    let chance = new Chance();

    let _getNumber = function () {
        return chance.natural({ min: 1, max: 500 });
    };

    return {
        Number: _getNumber
    }
});