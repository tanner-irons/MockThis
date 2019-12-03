'use strict';

require("@babel/polyfill");
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
        // let flatSchema = flatten(_schema);
        let flatSchema = makeFlat(_schema);

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

function makeFlat(schema) {
    let flat = {};
    let stack = [{ parent: null, nodes: schema }];

    while (stack.length > 0) {
        let current = stack.pop();
        if (!current || Object.keys(current.nodes || {}).length === 0) {
            continue;
        }
        let keys = Object.keys(current.nodes);
        for (let i = 0; i < keys.length; i++) {
            let key = current.parent ? current.parent + '.' + keys[i] : keys[i];
            if (current.nodes[keys[i]] instanceof Object) {
                stack.push({
                    parent: key,
                    nodes: current.nodes[keys[i]]
                });
            }
            else {
                flat[key] = current.nodes[keys[i]];
            }
        }
    }
    return flat;
}

MockedObject.Types = require('./mockthis.types.js');

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

module.exports = MockedObject;