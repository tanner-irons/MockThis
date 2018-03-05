define(['lodash', 'mockthis.types', 'mockthis.generate'], function (_, Types, GenerationService) {
    'use strict';

    let _json = function () {
        let generatedData = GenerationService.generateData.bind(this)();
        return JSON.stringify(generatedData);
    };

    let _object = function () {
        return GenerationService.generateData.bind(this)();
    }

    let _lodash = function () {
        let generatedData = GenerationService.generateData.bind(this)();
        return _.chain(generatedData);
    }

    return {
        JSON: _json,
        Object: _object,
        Lodash: _lodash
    }
});