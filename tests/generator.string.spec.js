'use strict';

let Generator = require('../mockthis/build/generators/generator.string.js');
let Chance = require('chance');

describe('String Generator', function () {

    it('should return a string when getWord() is called', function () {
        let word = Generator.Word();
        expect(typeof word).toEqual('string');
    });

    it('should return a string when getSentence() is called', function () {
        let sentence = Generator.Sentence();
        expect(typeof sentence).toEqual('string');
    });

    it('should return a string when getParagraph() is called', function () {
        let paragraph = Generator.Paragraph();
        expect(typeof paragraph).toEqual('string');
    });

});