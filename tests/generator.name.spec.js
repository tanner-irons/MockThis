define(['generators/mockthis.generator.name', 'chance'], function (Generator, Chance) {
    'use strict';

    describe('Name Generator', function () {

        it('should return a name string when getFirstName() is called', function () {
            spyOn(Chance.prototype, 'first').and.returnValue('Tanner');
            let name = Generator.getFirstName();
            expect(name).toEqual('Tanner');
        });

        it('should return a name string when getLastName() is called', function () {
            spyOn(Chance.prototype, 'last').and.returnValue('Irons');
            let name = Generator.getLastName();
            expect(name).toEqual('Irons');
        });

    });
});