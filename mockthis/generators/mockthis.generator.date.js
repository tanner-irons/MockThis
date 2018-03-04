define(['chance'], function (Chance) {
    'use strict';

    let chance = new Chance()

    let _getDate = function () {
        return chance.date({ string: true });
    }

    let _getBirthday = function () {
        return chance.birthday({ string: true });
    }

    return {
        getDate: _getDate,
        getBirthday: _getBirthday
    }
});