define(['generators/mockthis.generator.number'], function (Generator) {
    'use strict';

    describe('Number Generator', function () {

        it('should return a positive Integer string when getNumber() is called', function () {
            let number = Generator.getNumber();
            expect(number).toBeGreaterThan(0);
        });

    });
});