'use strict';

let With = require('./mockthis.with.js');
let As = require('./mockthis.as.js');
let Types = require('./mockthis.types.js');
let Moment = require('moment');

let createMock = function (_schema) {
    if (!_schema) {
        throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
    }
    if (!(_schema instanceof Object) || _schema instanceof Array) {
        throw new TypeError('Provided schema should be a valid object literal.');
    }
    this.blueprint.schema = _schema;
    return this;
};

function MockedObject() {
    return createMock.apply(MockedObject, arguments);
}

MockedObject.blueprint = {
    schema: {},
    total: 1,
    required: [],
    formats: {},
    array: {
        min: 0,
        max: 10,
        strict: false
    }
};

MockedObject.as = {
    JSON: As.JSON.bind(MockedObject),
    Object: As.Object.bind(MockedObject),
    Lodash: As.Lodash.bind(MockedObject)
};

MockedObject.with = {
    Multiple: With.Multiple.bind(MockedObject),
    MaxArray: With.MaxArray.bind(MockedObject),
    MinArray: With.MinArray.bind(MockedObject),
    Required: With.Required.bind(MockedObject),
    NewType: With.NewType.bind(MockedObject),
    DateFormat: With.DateFormat.bind(MockedObject),
    Logic: With.Logic.bind(MockedObject)
};

MockedObject.and = MockedObject.with;

MockedObject.Types = Types;

module.exports = MockedObject;