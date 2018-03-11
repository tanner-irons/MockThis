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

    let start = performance.now();
    let Pets = MockThis(mockPetObject).with.Multiple(1000).with.ArrayMax(50).with.NewType('Animal', (getGenerator) => {
        let name = getGenerator('First').First();
        return {
            animal: chance.animal(),
            name: name
        }
    }).with.DateFormat('dd-mm-yyyy').as.Object();
    console.log(performance.now() - start);
    console.log(Pets);
    document.getElementsByClassName('info')[0].innerHTML = Pets;
});  