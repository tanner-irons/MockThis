'use strict';

let Chance = new (require('chance'))();

let _getNumber = function () {
    return Chance.natural({ min: 1, max: 500 });
};

module.exports = {
    Number: _getNumber
};