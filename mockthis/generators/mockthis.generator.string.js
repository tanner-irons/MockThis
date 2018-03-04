define(['chance'], function (Chance) {
    'use strict';

    let chance = new Chance();

    let _getWord = function () {
        return chance.word();
    }

    let _getSentence = function () {
        return chance.sentence();
    }

    let _getParagraph = function () {
        return chance.paragraph();
    };

    return {
        getString: _getSentence,
        getWord: _getWord,
        getSentence: _getSentence,
        getParagraph: _getParagraph
    }
});