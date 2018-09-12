'use strict';

let With = require('./mockthis.with.js');
let As = require('./mockthis.as.js');

function MockedObject() {
    return (function(_schema) {
        if (!_schema) {
            throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        }
        if (!(_schema instanceof Object) || _schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }
        this.blueprint.schema = _schema;
        return this;
    }).apply(MockedObject, arguments);
}

MockedObject.Types = require('./mockthis.types.js');

MockedObject.blueprint = {
    schema: {},
    total: 1,
    required: [],
    formats: {},
    array: {
        min: 1,
        max: 10
    }
};

MockedObject.as = {
    JSON: As.JSON.bind(MockedObject),
    Object: As.Object.bind(MockedObject),
    Lodash: As.Lodash.bind(MockedObject)
};

MockedObject.with = MockedObject.and = {
    Multiple: With.Multiple.bind(MockedObject),
    MaxArray: With.MaxArray.bind(MockedObject),
    MinArray: With.MinArray.bind(MockedObject),
    Required: With.Required.bind(MockedObject),
    NewType: With.NewType.bind(MockedObject),
    DateFormat: With.DateFormat.bind(MockedObject),
    Logic: With.Logic.bind(MockedObject)
};

module.exports = MockedObject;