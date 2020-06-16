'use strict';

import chance from 'chance';

import moment from 'moment';

const Chance = new chance();

let _getDate = function (blueprint) {
    if (blueprint && blueprint.formats && blueprint.formats.date) {
        return moment(Chance.date(), moment.defaultFormat).format(blueprint.formats.date);
    }
    return moment(Chance.date(), moment.defaultFormat).format();
};

let _getBirthday = function (blueprint) {
    if (blueprint && blueprint.formats && blueprint.formats.date) {
        return moment(Chance.birthday(), moment.defaultFormat).format(blueprint.formats.date);
    }
    return moment(Chance.birthday(), moment.defaultFormat).format();
};

module.exports = {
    Date: _getDate,
    Birthday: _getBirthday
}