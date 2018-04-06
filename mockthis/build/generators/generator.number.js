'use strict';

let Chance = require('chance');

let chance = new Chance();

let _getNumber = function () {
    return chance.natural({ min: 1, max: 500 });
};

module.exports = {
    Number: _getNumber
}