(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MockThis = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var Chance = typeof window !== "undefined" ? window['Chance'] : typeof global !== "undefined" ? global['Chance'] : null;

var chance = new Chance();

var _getDate = function _getDate() {
    return chance.date({ string: true });
};

var _getBirthday = function _getBirthday() {
    return chance.birthday({ string: true });
};

module.exports = {
    Date: _getDate,
    Birthday: _getBirthday
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

var Types = require('../mockthis.types.js');
var StringGenerator = require('./generator.string.js');
var NumberGenerator = require('./generator.number.js');
var NameGenerator = require('./generator.name.js');
var DateGenerator = require('./generator.date.js');
var UserDefGenerator = require('./generator.userDef.js');

module.exports = {
    getInstanceOf: function getInstanceOf(type) {
        switch (type) {
            case Types.String:
            case Types.Text.Word:
            case Types.Text.Sentence:
            case Types.Text.Paragraph:
                return StringGenerator;
            case Types.Number:
                return NumberGenerator;
            case Types.Name.First:
            case Types.Name.Last:
                return NameGenerator;
            case Types.Date:
            case Types.Birthday:
                return DateGenerator;
            default:
                return UserDefGenerator.userDefTypes;
        }
    }
};

},{"../mockthis.types.js":9,"./generator.date.js":1,"./generator.name.js":3,"./generator.number.js":4,"./generator.string.js":5,"./generator.userDef.js":6}],3:[function(require,module,exports){
(function (global){
'use strict';

var Chance = typeof window !== "undefined" ? window['Chance'] : typeof global !== "undefined" ? global['Chance'] : null;

var chance = new Chance();

var _getFirstName = function _getFirstName() {
    return chance.first();
};

var _getLastName = function _getLastName() {
    return chance.last();
};

module.exports = {
    First: _getFirstName,
    Last: _getLastName
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var Chance = typeof window !== "undefined" ? window['Chance'] : typeof global !== "undefined" ? global['Chance'] : null;

var chance = new Chance();

var _getNumber = function _getNumber() {
    return chance.natural({ min: 1, max: 500 });
};

module.exports = {
    Number: _getNumber
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var Chance = typeof window !== "undefined" ? window['Chance'] : typeof global !== "undefined" ? global['Chance'] : null;

var chance = new Chance();

var _getWord = function _getWord() {
    return chance.word();
};

var _getSentence = function _getSentence() {
    return chance.sentence();
};

var _getParagraph = function _getParagraph() {
    return chance.paragraph();
};

module.exports = {
    Word: _getWord,
    Sentence: _getSentence,
    Paragraph: _getParagraph
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

var userDefTypes = {};

var _addUserDefType = function _addUserDefType(type, callback) {
    userDefTypes[type] = callback;
};

module.exports = {
    addType: _addUserDefType,
    userDefTypes: userDefTypes
};

},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null;
var Types = require('./mockthis.types.js');
var GeneratorFactory = require('./generators/generator.factory.js');

var _generateObject = function _generateObject(blueprint) {
    var arrayMax = blueprint.arrays.max || 10;
    var arrayLength = blueprint.arrays.strict ? blueprint.arrays.max : Math.round(Math.random() * arrayMax);
    var required = blueprint.required || [];
    var schema = blueprint.schema || {};
    var tempObject = {};
    var typeValue = void 0,
        generator = void 0,
        undefinedChance = void 0,
        i = void 0,
        key = void 0;

    for (key in schema) {
        undefinedChance = required.length === 0 ? 1 : Math.random();
        if (schema[key] instanceof Array) {
            tempObject[key] = [];
            for (i = 0; i < arrayLength; i++) {
                blueprint.schema = schema[key];
                tempObject[key].push(_generateObject(blueprint)[0]);
            }
        } else if (schema[key] instanceof Object) {
            blueprint.schema = schema[key];
            tempObject[key] = _generateObject(blueprint);
        } else {
            generator = GeneratorFactory.getInstanceOf(schema[key]);
            typeValue = generator[schema[key]](GeneratorFactory.getInstanceOf);
            tempObject[key] = undefinedChance >= .2 || required.indexOf(key) > -1 ? typeValue : undefined;
        }
    }
    return tempObject;
};

var _generateData = function _generateData(blueprint) {
    var dataConfig = {
        schema: blueprint.schema,
        required: blueprint.required,
        arrays: blueprint.arrays
    };
    var tempArray = [];
    var i = void 0;
    for (i = 0; i < blueprint.total; i++) {
        tempArray.push(_generateObject(_extends({}, dataConfig)));
    }
    return tempArray.length > 1 ? tempArray : tempArray[0];
};

module.exports = {
    Object: function Object() {
        return _generateData(this.blueprint);
    },
    JSON: function (_JSON) {
        function JSON() {
            return _JSON.apply(this, arguments);
        }

        JSON.toString = function () {
            return _JSON.toString();
        };

        return JSON;
    }(function () {
        return JSON.stringify(_generateData(this.blueprint));
    }),
    Lodash: function Lodash() {
        return _.chain(_generateData(this.blueprint));
    }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./generators/generator.factory.js":2,"./mockthis.types.js":9}],8:[function(require,module,exports){
'use strict';

var With = require('./mockthis.with.js');
var As = require('./mockthis.as.js');

function MockedObject(_schema) {
    this.blueprint = {
        schema: _schema,
        total: 1,
        required: [],
        formats: {},
        arrays: {
            max: 10,
            strict: false
        }
    };

    this.as = {
        JSON: As.JSON.bind(this),
        Object: As.Object.bind(this),
        Lodash: As.Lodash.bind(this)
    };

    this.with = {
        Multiple: With.Multiple.bind(this),
        ArrayMax: With.ArrayMax.bind(this),
        Required: With.Required.bind(this),
        NewType: With.NewType.bind(this),
        DateFormat: With.DateFormat.bind(this),
        Logic: With.Logic.bind(this)
    };
}

module.exports = function (schema) {
    return new MockedObject(schema);
};

},{"./mockthis.as.js":7,"./mockthis.with.js":10}],9:[function(require,module,exports){
'use strict';

module.exports = {
    String: 'String',
    Number: 'Number',
    Boolean: 'Boolean',
    Date: 'Date',
    Today: 'Today',
    Yesterday: 'Yesterday',
    Tomorrow: 'Tomorrow',
    Birthday: 'Birthday',
    Text: {
        Word: 'Word',
        Sentence: 'Sentence',
        Paragraph: 'Paragraph'
    },
    Name: {
        First: 'First',
        Last: 'Last'
    },
    Address: 'Address',
    Phone: 'Phone',
    Email: 'Email',
    NewType: 'NewType'
};

},{}],10:[function(require,module,exports){
'use strict';

var UserDefGenerator = require('./generators/generator.userDef.js');

var _multiple = function _multiple(amount) {
    this.blueprint.total = amount;
    return this;
};

var _required = function _required(required) {
    this.blueprint.required = required;
    return this;
};

var _newType = function _newType(newType, callback) {
    UserDefGenerator.addType(newType, callback);
    return this;
};

var _dateFormat = function _dateFormat(asString) {
    this.blueprint.formats.date = asString;
    return this;
};

var _arrayMax = function _arrayMax(max, strict) {
    this.blueprint.arrays = {
        max: max,
        strict: strict
    };
    return this;
};

var _logic = function _logic() {};

module.exports = {
    Multiple: _multiple,
    Required: _required,
    NewType: _newType,
    DateFormat: _dateFormat,
    ArrayMax: _arrayMax,
    Logic: _logic
};

},{"./generators/generator.userDef.js":6}]},{},[8])(8)
});
