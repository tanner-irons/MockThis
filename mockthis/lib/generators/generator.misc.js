'use strict';

let Chance = new (require('chance'))();

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