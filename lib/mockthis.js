'use strict';

import * as With from './mockthis.with.js';
import * as As from './mockthis.as.js';
import * as GeneratorFactory from './generators/generator.factory.js';
import { makeFlat } from './mockthis.utilities';

function MockedObject() {
    return (function (_schema) {
        if (!_schema) {
            throw new ReferenceError('Schema is required. Please provide a valid object literal as the schema.');
        }
        if (!(_schema instanceof Object) || _schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }

        let flattenedSchema = makeFlat(_schema);

        this.blueprint.schema = Object.keys(flattenedSchema).map((prop) => {
            return {
                property: prop,
                type: flattenedSchema[prop],
                dependencies: []
            }
        });

        return this;
    }).apply(MockedObject, arguments);
}

MockedObject.blueprint = {
    schema: {},
    sortedSchema: {},
    total: {
        min: 1,
        max: 1
    },
    required: [],
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
    Random: With.Random.bind(MockedObject),
    Sequence: With.Sequence.bind(MockedObject),
    DateFormat: With.DateFormat.bind(MockedObject),
    Logic: With.Logic.bind(MockedObject)
};

module.exports = {
    MockThis: MockedObject,
    Types: require('./mockthis.types.js'),
    getType: GeneratorFactory.getInstanceOf
};