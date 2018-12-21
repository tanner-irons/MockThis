'use strict';

// let MockThis = require("../mockthis/dist/mockthis.js");
// let chance = new (require("chance"))();

let mockPetObject = {
    id: MockThis.Types.Number,
    note: MockThis.Types.Text.Paragraph,
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last,
        birthday: MockThis.Types.Birthday,
        address: MockThis.Types.Location.Address,
        city: MockThis.Types.Location.City,
        state: MockThis.Types.Location.State,
        zip: MockThis.Types.Location.ZipCode,
        bio: MockThis.Types.Dependent
    },
    animals: ['Animal']
};

let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(100, 150)
    .with.ArrayLength(2, 15)
    .with.NewRandom('Activity', ['run', 'sleep', 'eat'])
    .with.NewType('Animal', (getType) => {
        return {
            type: chance.animal(),
            name: getType(MockThis.Types.Name.First),
            weight: `${getType(MockThis.Types.Number)}lbs`,
            birthdate: getType(MockThis.Types.Birthday),
            adoptedDate: getType(MockThis.Types.Date),
            favoriteActivity: getType('Activity'),
            notes: getType(MockThis.Types.Text.Paragraph)
        };
    })
    .with.Logic('owner.bio',
        ['owner.firstName', 'owner.lastName', 'owner.address', 'owner.city', 'owner.state', 'owner.zip', 'animals.0',
            (firstName, lastName, address, city, state, zip, animal) => {
                return `${firstName} ${lastName} adopted ${animal.name} on ${animal.adoptedDate}. They live at ${address} ${city}, ${state} ${zip}. ${animal.name} loves to ${animal.favoriteActivity}.`;
            }])
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);