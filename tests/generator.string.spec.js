define(['generators/mockthis.generator.string', 'chance'], function (Generator, Chance) {
    'use strict';

    describe('String Generator', function () {

        it('should return a string when getWord() is called', function () {
            let word = Generator.getWord();
            expect(typeof word).toEqual('string');
        });

        it('should return a string when getSentence() is called', function () {
            let sentence = Generator.getSentence();
            expect(typeof sentence).toEqual('string');
        });

        it('should return a string when getParagraph() is called', function () {
            let paragraph = Generator.getParagraph();
            expect(typeof paragraph).toEqual('string');
        });

    });
});