'use strict';

let Generator = require('../mockthis/build/generators/generator.name.js');
let Chance = require('chance');

describe('Name Generator', function () {

    it('should return a name string when getFirstName() is called', function () {
        spyOn(Chance.prototype, 'first').and.returnValue('Tanner');
        let name = Generator.First();
        expect(name).toEqual('Tanner');
    });

    it('should return a name string when getLastName() is called', function () {
        spyOn(Chance.prototype, 'last').and.returnValue('Irons');
        let name = Generator.Last();
        expect(name).toEqual('Irons');
    });

});