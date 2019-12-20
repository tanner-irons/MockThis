'use strict';

import * as chance from 'chance';

const Chance = new chance();

let _getWord = function () {
    return Chance.word();
};

let _getSentence = function () {
    return Chance.sentence();
};

let _getParagraph = function () {
    return Chance.paragraph();
};

module.exports = {
    Word: _getWord,
    Sentence: _getSentence,
    Paragraph: _getParagraph
};