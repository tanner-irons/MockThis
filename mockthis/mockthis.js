define(['mockthis.with', 'mockthis.as', 'mockthis.generate'], function (With, As, GenerationService) {
    'use strict';

    function MockedObject(_schema) {
        this.blueprint = {
            schema: _schema,
            total: 1,
            required: [],
            userDefTypes: [],
            formats: {}
        }

        this.as = {
            JSON: As.JSON.bind(this),
            Object: As.Object.bind(this)
        }

        this.with = {
            Multiple: With.Multiple.bind(this),
            Required: With.Required.bind(this),
            NewType: With.NewType.bind(this),
            DateFormat: With.DateFormat.bind(this)
        }
    }

    return function (schema) {
        return new MockedObject(schema);
    }
});