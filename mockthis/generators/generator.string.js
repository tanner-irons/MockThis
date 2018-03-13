define(['chance'], function (Chance) {
    'use strict';

    let chance = new Chance();

    let _getWord = function () {
        return chance.word();
    };

    let _getSentence = function () {
        return chance.sentence();
    };

    let _getParagraph = function () {
        return chance.paragraph();
    };

    return {
        Word: _getWord,
        Sentence: _getSentence,
        Paragraph: _getParagraph
    }
});