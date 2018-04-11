'use strict';

let Generator = require('../mockthis/lib/generators/generator.number.js');
let Chance = require('chance');

describe('Number Generator', function () {

    it('should return a positive Integer string when getNumber() is called', function () {
        let number = Generator.Number();
        expect(number).toBeGreaterThan(0);
    });

});