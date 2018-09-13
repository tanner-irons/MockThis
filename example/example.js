'use strict';

let mockPetObject = {
    id: MockThis.Types.Number,
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last,
        birthday: MockThis.Types.Birthday,
        description: MockThis.Types.Text.Paragraph
    },
    animals: ['Animal'],
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
    .with.Multiple(2)
    .with.MaxArray(15)
    .with.MinArray(2)
    .with.Required(['id'])
    .with.Required(['owner.firstName'])
    .with.NewType('Animal', (getType) => {
        let quantity = getType(MockThis.Types.Number);
        return {
            animal: chance.animal(),
            quantity: quantity
        }
    })
    .with.Logic('owner.description', ['owner.firstName', (firstName, defaultValue) => {
        console.log(defaultValue);
        if (firstName.length >= 6) {
            return 'This owners name is over 6 characters long.'
        }
        return 'This owner\'s name is less than 6 characters long.'
    }])
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);