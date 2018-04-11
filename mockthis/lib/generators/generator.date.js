'use strict';

let Chance = require('chance');

let chance = new Chance();

let _getDate = function () {
    return chance.date({ string: true });
};

let _getBirthday = function () {
    return chance.birthday({ string: true });
};

module.exports = {
    Date: _getDate,
    Birthday: _getBirthday
}