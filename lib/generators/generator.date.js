'use strict';

import * as chance from 'chance';
import * as moment from 'moment';

const Chance = new chance();

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