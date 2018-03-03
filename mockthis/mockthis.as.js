define(['mockthis.types', 'mockthis.generate'], function (Types, GenerationService) {
    'use strict';

    let _json = function () {
        let generatedData = GenerationService.generateData(this.blueprint);
        return JSON.stringify(generatedData);
    };

    let _object = function () {
        return GenerationService.generateData(this.blueprint);
    }

    return {
        JSON: _json,
        Object: _object
    }
});