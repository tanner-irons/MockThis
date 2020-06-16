'use strict';

import chance from 'chance';

const Chance = new chance();

let _getFirstName = function () {
    return Chance.first();
};

let _getLastName = function () {
    return Chance.last();
};

module.exports = {
    First: _getFirstName,
    Last: _getLastName
};