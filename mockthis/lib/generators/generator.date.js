'use strict';

let Chance = new (require('chance'))();

let _getDate = function () {
    return Chance.date({ string: true });
};

let _getBirthday = function () {
    return Chance.birthday({ string: true });
};

module.exports = {
    Date: _getDate,
    Birthday: _getBirthday
}