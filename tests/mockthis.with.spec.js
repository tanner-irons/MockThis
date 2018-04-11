'use strict';

let MockThis = require('../mockthis/build/mockthis.js');
let With =  require('../mockthis/build/mockthis.with.js');
let GeneratorFactory =  require('../mockthis/build/generators/generator.factory.js');

describe('MockThis.With', function () {

    it('should set instance of MockThis "total" property when Multiple(n) is called', function () {
        let mock = MockThis({}).with.Multiple(2);
        expect(mock.blueprint.total).toEqual(2);
    });

    it('should set instance of MockThis "required" property when Required([]) is called', function () {
        let mock = MockThis({}).with.Required(['test']);
        expect(mock.blueprint.required instanceof Array).toEqual(true);
        expect(mock.blueprint.required).toEqual(['test']);
    });

    it('should set instance of MockThis "userDefTypes" property when NewType(type, callback) is called', function () {
        let mock = MockThis({}).with.NewType('testType', function () {
            return 'testData';
        });
        let Generator = GeneratorFactory.getInstanceOf('UserDef');
        expect(Generator instanceof Object).toEqual(true);
        expect(Generator['testType'] instanceof Function).toEqual(true);
    });

    it('should push type and callback to instance of MockThis "userDefTypes" property when NewType(type, callback) is called more than once', function () {
        let mock = MockThis({}).with.NewType('testType', function () {
            return 'testData';
        }).with.NewType('secondType', function () {
            return 'secondType';
        });
        let Generator = GeneratorFactory.getInstanceOf('UserDef');
        expect(Generator['testType']).toBeDefined();
        expect(Object.keys(Generator).length).toEqual(2);
    });

    it('should set instance of MockThis "formats.date" property when DateFormat(format) is called', function () {
        let mock = MockThis({}).with.DateFormat('mm/dd/yyyy');
        expect(mock.blueprint.formats.date).toEqual('mm/dd/yyyy');
    });

    it('should set instance of MockThis "array.max" property when MaxArray(max) is called', function () {
        let mock = MockThis({}).with.MaxArray(5);
        expect(mock.blueprint.array.max).toEqual(5);
    });

});