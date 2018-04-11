'use strict';

let With = require('./mockthis.with.js');
let As = require('./mockthis.as.js');

function MockedObject(_schema) {
    this.blueprint = {
        schema: _schema,
        total: 1,
        required: [],
        formats: {},
        array: {
            min: 0,
            max: 10,
            strict: false
        }
    }

    this.as = {
        JSON: As.JSON.bind(this),
        Object: As.Object.bind(this),
        Lodash: As.Lodash.bind(this)
    }

    this.with = {
        Multiple: With.Multiple.bind(this),
        MaxArray: With.MaxArray.bind(this),
        MinArray: With.MinArray.bind(this),
        Required: With.Required.bind(this),
        NewType: With.NewType.bind(this),
        DateFormat: With.DateFormat.bind(this),
        Logic: With.Logic.bind(this)
    }
}

module.exports = (schema) => {
    if(!schema) {
        throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        return;
    }
    if(!(schema instanceof Object) || schema instanceof Array){
        throw new TypeError('Provided schema should be a valid object literal.');
        return;
    }
    return new MockedObject(schema);
};