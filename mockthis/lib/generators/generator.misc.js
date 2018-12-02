'use strict';

let Chance = new (require('chance'))();

let _getAnimal = () => {
    return Chance.animal();
};

let _getPhoneNumber = () => {
    return Chance.phone();
}

module.exports = {
    Animal: _getAnimal,
    PhoneNumber: _getPhoneNumber
}