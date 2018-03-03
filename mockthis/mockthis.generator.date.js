define([], function () {
    'use strict';

    let _getDate = function () {
        return new Date().getDate();
    }

    return {
        getDate: _getDate
    }
});