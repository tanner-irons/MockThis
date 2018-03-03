define(['mockthis', 'mockthis.types'], function (MockThis, Types) {
    'use strict';

    let data = MockThis({ name: Types.Name.First, date: Types.Date }).with.Multiple(5).with.Required(['name']).as.JSON();
    console.log(data);
    document.getElementsByClassName('info')[0].innerHTML = data;
});  