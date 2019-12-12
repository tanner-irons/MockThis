'use strict';

const MockThis = require("../mockthis/dist/mockthis.js");
const { performance } = require('perf_hooks');
const chance = new (require("chance"))();
const { pretty } = require('js-object-pretty-print');
const fs = require('fs');
const { exec } = require('child_process');
const moment = require('moment');

const mockPetObject = {
    id: MockThis.Types.Number,
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last,
        birthdate: MockThis.Types.Birthday,
        address: {
            street: MockThis.Types.Location.Address,
            city: MockThis.Types.Location.City,
            state: MockThis.Types.Location.State,
            zip: MockThis.Types.Location.ZipCode
        },
        bio: MockThis.Types.Dependent,
        animal: 'Animal'
    },
};

const start = performance.now();
const Pets = MockThis(mockPetObject)
    .with.Multiple(1, 5)
    .with.ArrayLength(1, 10)
    .with.Random('Activity', ['run', 'sleep', 'eat'])
    .with.Sequence('Color', ['red', 'blue', 'green', 'yellow'])
    .with.NewType('Animal', (getType) => {
        const birthdate = getType(MockThis.Types.Birthday);
        const age = moment().diff(birthdate, 'year');
        const adoptedDate = getType(MockThis.Types.Date);
        return {
            type: chance.animal(),
            color: getType('Color'),
            name: getType(MockThis.Types.Name.First),
            weight: `${getType(MockThis.Types.Number)}lbs`,
            birthdate,
            age,
            adoptedDate,
            favoriteActivity: getType('Activity'),
            bio: getType(MockThis.Types.String.Paragraph)
        };
    })
    .with.Logic('owner.bio', ['owner.firstName', 'owner.lastName', 'owner.address.street', 'owner.address.city', 'owner.address.state', 'owner.address.zip', 'owner.animal',
        (firstName, lastName, address, city, state, zip, animal) => {
            return `${firstName} ${lastName} adopted ${animal.name} the ${animal.type.toLowerCase()} on ${animal.adoptedDate}. They live at ${address} ${city}, ${state} ${zip}. ${animal.name} loves to ${animal.favoriteActivity}.`;
        }])
    .and.DateFormat('YYYY-MM-DD')
    .as.JSON(null, 1);

console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
fs.writeFile('./example/example.json', Pets, () => {});
exec('code ./example/example.json');