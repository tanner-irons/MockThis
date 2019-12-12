'use strict';

let Chance = new (require('chance'))();
const moment = require('moment');

let _getDate = function (getType, blueprint) {
    return moment(Chance.date()).format(blueprint.formats.date);
};

let _getBirthday = function (getType, blueprint) {
    return moment(Chance.birthday()).format(blueprint.formats.date);
};

module.exports = {
    Date: _getDate,
    Birthday: _getBirthday
}