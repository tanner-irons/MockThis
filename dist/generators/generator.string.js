'use strict';

var _chance = _interopRequireDefault(require("chance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getWord = function _getWord() {
  return Chance.word();
};

var _getSentence = function _getSentence() {
  return Chance.sentence();
};

var _getParagraph = function _getParagraph() {
  return Chance.paragraph();
};

module.exports = {
  Word: _getWord,
  Sentence: _getSentence,
  Paragraph: _getParagraph
};