define([], function () {
    'use strict';

    let _getFirstName = function () {
        let firstNames = ['Mike', "John", "Mary", "Jennifer", "Greg"];
        let random = Math.round(Math.random() * firstNames.length);
        return firstNames[random];
    };

    let _getLastName = function() {
        return 'Irons';
    }

    return {
        getFirstName: _getFirstName
    }
});