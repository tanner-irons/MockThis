define(['mockthis.types', 'mockthis.generator.name', 'mockthis.generator.date'], function (Types, NameGenerator, DateGenerator) {
    'use strict';

    return {
        getInstanceOf: function (type) {
            switch (type) {
                case Types.String:
                    return;
                case Types.Number:
                    return;
                case Types.Name.First:
                    return NameGenerator;
                case Types.Date:
                    return DateGenerator;
                default:
                    return;
            }
        }
    }
});