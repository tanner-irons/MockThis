define(['mockthis', 'mockthis.with'], function (MockThis, With) {
    'use strict';

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
            expect(mock.blueprint.userDefTypes[0] instanceof Object).toEqual(true);
            expect(typeof mock.blueprint.userDefTypes[0].type).toEqual('string');
            expect(mock.blueprint.userDefTypes[0].type).toEqual('testType');
            expect(mock.blueprint.userDefTypes[0].callback instanceof Function).toEqual(true);
            expect(mock.blueprint.userDefTypes[0].callback()).toEqual('testData');
        });

        it('should push type and callback to instance of MockThis "userDefTypes" property when NewType(type, callback) is called more than once', function () {
            let mock = MockThis({}).with.NewType('testType', function () {
                return 'testData';
            }).with.NewType('secondType', function () {
                return 'secondType';
            });
            expect(Array.isArray(mock.blueprint.userDefTypes)).toEqual(true);
            expect(mock.blueprint.userDefTypes.length).toEqual(2);
        });

        it('should set instance of MockThis "formats.date" property when DateFormat(format) is called', function () {
            let mock = MockThis({}).with.DateFormat('mm/dd/yyyy');
            expect(mock.blueprint.formats.date).toEqual('mm/dd/yyyy');
        });

        it('should set instance of MockThis "arrayMax" property when ArrayMax(max) is called', function () {
            let mock = MockThis({}).with.ArrayMax(5);
            expect(mock.blueprint.arrayMax).toEqual(5);
        });

    });
});