'use strict';

let With = require('./mockthis.with.js');
let As = require('./mockthis.as.js');

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
    }

    this.as = {
        JSON: As.JSON.bind(this),
        Object: As.Object.bind(this),
        Lodash: As.Lodash.bind(this)
    }

    this.with = {
        Multiple: With.Multiple.bind(this),
        ArrayMax: With.ArrayMax.bind(this),
        Required: With.Required.bind(this),
        NewType: With.NewType.bind(this),
        DateFormat: With.DateFormat.bind(this),
        Logic: With.Logic.bind(this)
    }
}

module.exports = (schema) => {
    return new MockedObject(schema);
};