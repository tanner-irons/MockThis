'use strict';

// let MockThis = require("../mockthis/dist/mockthis.js");
// let chance = new (require("chance"))();

let mockPetObject = {
    id: MockThis.Types.Number,
    color: 'Color',
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last,
        birthday: MockThis.Types.Birthday,
        description: MockThis.Types.Text.Paragraph
    },
    location: MockThis.Types.Location.State,
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

//let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(200)
    .with.MaxArray(15)
    .with.MinArray(2)
    .with.NewRandom('Color', ['blue', 'red', 'purple'])
    .with.NewType('Animal', (getType) => {
        let quantity = getType(MockThis.Types.Number);
        return {
            animal: chance.animal(),
            quantity: quantity,
            color: getType('Color')
        }
    })
    .with.Logic('owner.description', ['owner.firstName', (firstName, defaultValue) => {
        if (firstName && firstName.length >= 6) {
            return firstName + '\'s name is over 6 characters long.'
        }
        return firstName + '\'s name is less than 6 characters long.'
    }])
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
//console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);