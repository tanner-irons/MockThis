'use strict';

// let MockThis = require("../mockthis/dist/mockthis.js");
// let chance = new (require("chance"))();

let mockPetObject = {
    id: MockThis.Types.Number,
    names: [MockThis.Types.Dependent],
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last,
        birthday: MockThis.Types.Birthday,
        address: MockThis.Types.Location.Address,
        city: MockThis.Types.Location.City,
        state: MockThis.Types.Location.State,
        zip: MockThis.Types.Location.ZipCode,
        favoriteColor: 'Color',
        bio: MockThis.Types.Dependent
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

//let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(100, 150)
    .with.ArrayLength(2, 15)
    .with.NewRandom('Color', ['blue', 'red', 'purple'])
    .with.NewType('Animal', (getType) => {
        let quantity = getType(MockThis.Types.Number);
        return {
            animal: chance.animal(),
            quantity: quantity,
            color: getType('Color')
        }
    })
    .with.Logic('owner.bio',
        ['owner.firstName', 'owner.lastName', 'owner.birthday', 'owner.address', 'owner.city', 'owner.state', 'owner.zip', 'owner.favoriteColor',
            (firstName, lastName, birthday, address, city, state, zip, favoriteColor) => {
                return `${firstName} ${lastName} was born on ${birthday} and raised at ${address} ${city}, ${state} ${zip}. ${firstName}'s favorite color is ${favoriteColor}.`;
            }])
    .with.Logic('names', ['owner.favoriteColor', (color) => {
        return color;
    }])
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
//console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);