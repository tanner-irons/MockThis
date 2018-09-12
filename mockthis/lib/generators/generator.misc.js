'use strict';

let Chance = new (require('chance'))();

let _animal = function () {
    return Chance.animal();
};

module.exports = {
    Animal: _animal
}