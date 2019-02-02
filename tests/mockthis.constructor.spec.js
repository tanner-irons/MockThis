'use strict';

let MockThis = require('../mockthis/lib/mockthis.js');
let Types = require('../mockthis/lib/mockthis.types.js')

describe('MockThis.constructor', function () {

    it('should return a MockedObject when constructor is called', function () {
        let mock = MockThis({ test: 'Word' });
        expect(mock.name).toEqual('MockedObject');
    });

    it('should throw a reference error when undefined is passed to constructor', function () {
        expect(() => MockThis()).toThrow(new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.'));
    });

    it('should throw a type error when a non-object literal is passed to constructor', function () {
        expect(() => MockThis([])).toThrow(new TypeError('Provided schema should be a valid object literal.'));
        expect(() => MockThis('string')).toThrow(new TypeError('Provided schema should be a valid object literal.'));
        expect(() => MockThis(3)).toThrow(new TypeError('Provided schema should be a valid object literal.'));
    });

    it('should return Type object when constructor is called with Types property', function () {
        expect(MockThis.Types).toEqual(Types);
    });

});