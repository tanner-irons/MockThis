'use strict';

let flatten = require('flat');

let With = require('./mockthis.with.js');
let As = require('./mockthis.as.js');

function MockedObject() {
    return (function (_schema) {
        if (!_schema) {
            throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        }
        if (!(_schema instanceof Object) || _schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }
        let flatSchema = flatten(_schema);
        this.blueprint.schema = Object.keys(flatSchema).map((prop) => {
            return {
                property: prop,
                type: flatSchema[prop],
                dependencies: []
            }
        });
        return this;
    }).apply(MockedObject, arguments);
}

MockedObject.Types = require('./mockthis.types.js');

MockedObject.blueprint = {
    schema: null,
    sortedSchema: null,
    total: {
        min: 1,
        max: 1
    },
    required: [],
    optional: [],
    formats: {},
    logic: [],
    array: {
        min: 1,
        max: 10
    }
};

MockedObject.as = {
    JSON: As.JSON.bind(MockedObject),
    Object: As.Object.bind(MockedObject)
};

MockedObject.with = MockedObject.and = {
    Multiple: With.Multiple.bind(MockedObject),
    ArrayLength: With.ArrayLength.bind(MockedObject),
    Required: With.Required.bind(MockedObject),
    NewType: With.NewType.bind(MockedObject),
    NewRandom: With.NewRandom.bind(MockedObject),
    DateFormat: With.DateFormat.bind(MockedObject),
    Logic: With.Logic.bind(MockedObject)
};

module.exports = MockedObject;