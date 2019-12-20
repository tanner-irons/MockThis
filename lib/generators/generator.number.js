'use strict';

import * as chance from 'chance';

const Chance = new chance();

let _getNumber = function () {
    return Chance.natural({ min: 1, max: 500 });
};

module.exports = {
    Number: _getNumber
};