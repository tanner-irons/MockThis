define(['generators/generator.date', 'chance'], function (Generator, Chance) {
    'use strict';

    describe('Date Generator', function () {

        it('should return a date string when getBirthday() is called', function () {
            spyOn(Chance.prototype, 'birthday').and.returnValue('11/06/1989');
            let birthday = Generator.Birthday();
            expect(birthday).toEqual('11/06/1989');
        });

        it('should return a date string when getDate() is called', function () {
            spyOn(Chance.prototype, 'date').and.returnValue('11/06/1989');
            let date = Generator.Date();
            expect(date).toEqual('11/06/1989');
        });

    });
});