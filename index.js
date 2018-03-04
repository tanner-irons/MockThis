define(['mockthis', 'mockthis.types', 'chance'], function (MockThis, Types, Chance) {
    'use strict';

    let chance = new Chance();

    let mockPetObject = {
        owner: {
            firstName: Types.Name.First,
            lastName: Types.Name.Last
        },
        name: Types.Name.First,
        birthday: Types.Birthday,
        type: 'Animal',
        description: Types.Text.Paragraph,
        notes: [{
            text: Types.Text.Sentence,
            date: Types.Date,
            results: {
                test: Types.Text.Word,
                score: Types.Number
            }
        }]
    };
    let Pets = MockThis(mockPetObject).with.Multiple(5).with.ArrayMax(5).with.NewType('Animal', () => {
        return chance.animal();
    }).with.DateFormat('dd-mm-yyyy').as.Object();
    console.log(Pets);
    document.getElementsByClassName('info')[0].innerHTML = Pets;
});  