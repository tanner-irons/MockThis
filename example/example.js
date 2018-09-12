'use strict';

let mockPetObject = {
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last
    },
    name: MockThis.Types.Name.First,
    birthday: MockThis.Types.Birthday,
    animals: ['Animal'],
    description: MockThis.Types.Text.Paragraph,
    notes: [{
        text: MockThis.Types.Text.Sentence,
        date: MockThis.Types.Date,
        results: {
            test: MockThis.Types.Text.Word,
            score: MockThis.Types.Number
        }
    }]
};

let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(123)
    .with.MaxArray(15)
    .with.MinArray(2)
    .with.NewType('Animal', (getType) => {
        let quantity = getType(MockThis.Types.Number);
        return {
            animal: chance.animal(),
            quantity: quantity
        }
    })
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);