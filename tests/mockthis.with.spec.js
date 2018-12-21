'use strict';

let MockThis = require('../mockthis/lib/mockthis.js');
let GeneratorFactory =  require('../mockthis/lib/generators/generator.factory.js');
let With = require('../mockthis/lib/mockthis.with');

describe('MockThis.With', function () {
    let mock;
    beforeEach(() => {
        mock = MockThis({});
    });

    describe('when called with #Multiple', () => {

        it('should set instance of MockThis total.min = min & total.max = min when #Multiple(min) is called', () => {
            mock.with.Multiple(2);
            expect(mock.blueprint.total.min).toEqual(2);
            expect(mock.blueprint.total.max).toEqual(2);
        });
    
        it('should set instance of MockThis total.min = min & total.max = max when #Multiple(min, max) is called',  () => {
            mock.with.Multiple(2, 10);
            expect(mock.blueprint.total.min).toEqual(2);
            expect(mock.blueprint.total.max).toEqual(10);
        });

        describe('when argument of #Multiple is not a number', () => {
            it('should throw an error for min', () => {
                expect(() => mock.with.Multiple('one')).toThrow(new TypeError('Min argument must be a number.'));
            });

            it('should throw an error for max', () => {
                expect(() => mock.with.Multiple(1, 'two')).toThrow(new TypeError('Max argument must be a number.'));
            });
        });

        describe('when argument of #Multiple is not an positive integer or 0', () => {
            it('should throw an error for min', () => {
                expect(() => mock.with.Multiple(-1)).toThrow(new Error('Min argument must be a postive integer or 0.'));
            });

            it('should throw an error for max', () => {
                expect(() => mock.with.Multiple(1, -1)).toThrow(new Error('Max argument must be a postive integer or 0.'));
            });
        });
    });

    describe('when called with #ArrayLength', () => {

        it('should set instance of MockThis total.min = min & total.max = min when #ArrayLength(min) is called', () => {
            mock.with.ArrayLength(2);
            expect(mock.blueprint.array.min).toEqual(2);
            expect(mock.blueprint.array.max).toEqual(2);
        });
    
        it('should set instance of MockThis total.min = min & total.max = max when #ArrayLength(min, max) is called',  () => {
            mock.with.ArrayLength(2, 10);
            expect(mock.blueprint.array.min).toEqual(2);
            expect(mock.blueprint.array.max).toEqual(10);
        });

        describe('when argument of #ArrayLength is not a number', () => {
            it('should throw an error for min', () => {
                expect(() => mock.with.ArrayLength('one')).toThrow(new TypeError('Min argument must be a number.'));
            });

            it('should throw an error for max', () => {
                expect(() => mock.with.ArrayLength(1, 'two')).toThrow(new TypeError('Max argument must be a number.'));
            });
        });

        describe('when argument of #ArrayLength is not an positive integer or 0', () => {
            it('should throw an error for min', () => {
                expect(() => mock.with.ArrayLength(-1)).toThrow(new Error('Min argument must be a postive integer or 0.'));
            });

            it('should throw an error for max', () => {
                expect(() => mock.with.ArrayLength(1, -1)).toThrow(new Error('Max argument must be a postive integer or 0.'));
            });
        });
    });

    it('should set instance of MockThis "required" property when Required([]) is called', () => {
        mock.with.Required(['test']);
        expect(mock.blueprint.required instanceof Array).toEqual(true);
        expect(mock.blueprint.required).toEqual(['test']);
    });

    it('should set instance of MockThis "userDefTypes" property when NewType(type, callback) is called', function () {
        mock.with.NewType('testType', function () {
            return 'testTypeResult';
        });
        let Generator = GeneratorFactory.getInstanceOf('testType');
        expect(Generator()).toEqual('testTypeResult');
    });

    it('should push type and callback to instance of MockThis "userDefTypes" property when NewType(type, callback) is called more than once', function () {
        mock.with.NewType('firstType', function () {
            return 'firstTypeResult';
        }).with.NewType('secondType', function () {
            return 'secondTypeResult';
        });
        let FirstTypeGenerator = GeneratorFactory.getInstanceOf('firstType');
        expect(FirstTypeGenerator()).toEqual('firstTypeResult');
        let SecondTypeGenerator = GeneratorFactory.getInstanceOf('secondType');
        expect(SecondTypeGenerator()).toEqual('secondTypeResult');
    });

    it('should set instance of MockThis "formats.date" property when DateFormat(format) is called', function () {
        mock.with.DateFormat('mm/dd/yyyy');
        expect(mock.blueprint.formats.date).toEqual('mm/dd/yyyy');
    });

    it('should set instance of MockThis array.min = to min & array.max = min when ArrayLength(min) is called', function () {
        mock.with.ArrayLength(1);
        expect(mock.blueprint.array.min).toEqual(1);
        expect(mock.blueprint.array.min).toEqual(1);
    });

    it('should set instance of MockThis array.min = min & array.max = max" when ArrayLength(min, max) is called', function () {
        mock.with.ArrayLength(1, 5);
        expect(mock.blueprint.array.min).toEqual(1);
        expect(mock.blueprint.array.max).toEqual(5);
    });

});