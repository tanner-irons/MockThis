'use strict';

let Chance = require('chance');

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

module.exports = {
    Word: _getWord,
    Sentence: _getSentence,
    Paragraph: _getParagraph
}