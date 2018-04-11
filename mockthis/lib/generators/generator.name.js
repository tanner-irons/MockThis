'use strict';

let Chance = require('chance');

let chance = new Chance();

let _getFirstName = function () {
    return chance.first();
};

let _getLastName = function () {
    return chance.last();
};

module.exports = {
    First: _getFirstName,
    Last: _getLastName
}