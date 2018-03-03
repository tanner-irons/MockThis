define(['mockthis', 'mockthis.types'], function (MockThis, Types) {
    'use strict';

    let data = MockThis({ name: Types.Name.First, date: Types.Date, test: 'testType', notes: { text: Types.String, date: Types.Date, nest: { test: 'string', middleName: Types.Name.First } } }).with.Multiple(5).with.NewType('testType', function () {
        return 'testData';
    }).with.DateFormat('dd-mm-yyyy').as.Object();
    console.log(data);
    document.getElementsByClassName('info')[0].innerHTML = data;
});  