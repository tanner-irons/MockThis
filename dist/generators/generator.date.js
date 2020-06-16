'use strict';

var _chance = _interopRequireDefault(require("chance"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Chance = new _chance["default"]();

var _getDate = function _getDate(blueprint) {
  if (blueprint && blueprint.formats && blueprint.formats.date) {
    return (0, _moment["default"])(Chance.date(), _moment["default"].defaultFormat).format(blueprint.formats.date);
  }

  return (0, _moment["default"])(Chance.date(), _moment["default"].defaultFormat).format();
};

var _getBirthday = function _getBirthday(blueprint) {
  if (blueprint && blueprint.formats && blueprint.formats.date) {
    return (0, _moment["default"])(Chance.birthday(), _moment["default"].defaultFormat).format(blueprint.formats.date);
  }

  return (0, _moment["default"])(Chance.birthday(), _moment["default"].defaultFormat).format();
};

module.exports = {
  Date: _getDate,
  Birthday: _getBirthday
};