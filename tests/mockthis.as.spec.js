define(['lodash', 'mockthis', 'mockthis.as'], function (_, MockThis, As) {
    'use strict';

    describe('MockThis.As', function () {

        it('should return JSON when JSON() is called', function () {
            let mock = MockThis({ test: 'Word' }).as.JSON();
            let isJSON;
            try {
                JSON.parse(mock);
                isJSON = true;
            } catch (e) {
                isJSON = false;
            }
            expect(isJSON).toEqual(true);
        });

        it('should return JS object when Object() is called', function () {
            let mock = MockThis({ test: 'Word' }).as.Object();
            expect(mock instanceof Object).toEqual(true);
        });

    });
});