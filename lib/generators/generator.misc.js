'use strict';

import chance from 'chance';

const Chance = new chance();

let _getAnimal = function () {
    return Chance.animal();
};

let _getPhoneNumber = function () {
    return Chance.phone();
}

module.exports = {
    Animal: _getAnimal,
    PhoneNumber: _getPhoneNumber
}