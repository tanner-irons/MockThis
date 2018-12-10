'use strict';

let MockThis = require('../mockthis/lib/mockthis.js');
let With =  require('../mockthis/lib/mockthis.with.js');
let GeneratorFactory =  require('../mockthis/lib/generators/generator.factory.js');

describe('MockThis.With', function () {

    it('should set instance of MockThis total.min = min & total.max = min when Multiple(min) is called', function () {
        let mock = MockThis({}).with.Multiple(2);
        expect(mock.blueprint.total.min).toEqual(2);
        expect(mock.blueprint.total.max).toEqual(2);
    });

    it('should set instance of MockThis total.min = min & total.max = max when Multiple(min, max) is called', function () {
        let mock = MockThis({}).with.Multiple(2, 10);
        expect(mock.blueprint.total.min).toEqual(2);
        expect(mock.blueprint.total.max).toEqual(10);
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
        let Generator = GeneratorFactory.getInstanceOf('testType');
        expect(Generator instanceof Function).toBeTruthy();
    });

    it('should push type and callback to instance of MockThis "userDefTypes" property when NewType(type, callback) is called more than once', function () {
        let mock = MockThis({}).with.NewType('testType', function () {
            return 'testData';
        }).with.NewType('secondType', function () {
            return 'secondType';
        });
        let TestTypeGenerator = GeneratorFactory.getInstanceOf('testType');
        expect(TestTypeGenerator instanceof Function).toBeTruthy();
        let SecondTypeGenerator = GeneratorFactory.getInstanceOf('secondType');
        expect(SecondTypeGenerator instanceof Function).toBeTruthy();
    });

    it('should set instance of MockThis "formats.date" property when DateFormat(format) is called', function () {
        let mock = MockThis({}).with.DateFormat('mm/dd/yyyy');
        expect(mock.blueprint.formats.date).toEqual('mm/dd/yyyy');
    });

    it('should set instance of MockThis array.min = to min & array.max = min when ArrayLength(min) is called', function () {
        let mock = MockThis({}).with.ArrayLength(1);
        expect(mock.blueprint.array.min).toEqual(1);
        expect(mock.blueprint.array.min).toEqual(1);
    });

    it('should set instance of MockThis array.min = min & array.max = max" when ArrayLength(min, max) is called', function () {
        let mock = MockThis({}).with.ArrayLength(1, 5);
        expect(mock.blueprint.array.min).toEqual(1);
        expect(mock.blueprint.array.max).toEqual(5);
    });

});