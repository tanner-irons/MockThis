define(['mockthis.types', 'mockthis.generate'], function (Types, GenerationService) {
    'use strict';

    let _json = function () {
        let __ = this;
        let generatedData = GenerationService.generateData(__.blueprint);
        return JSON.stringify(generatedData);
    };

    return {
        JSON: _json
    }
});