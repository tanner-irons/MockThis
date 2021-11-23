'use strict';

const { MockThis, MockedTypes } = require("../mockthis/dist/mockthis.min.js");
const { performance } = require('perf_hooks');
const chance = new (require("chance"))();
const { pretty } = require('js-object-pretty-print');
const fs = require('fs');
const { exec } = require('child_process');
const moment = require('moment');

const mockPetObject = {
    id: MockedTypes.Number,
    owner: {
        firstName: MockedTypes.Name.First,
        lastName: MockedTypes.Name.Last,
        birthdate: MockedTypes.Birthday,
        address: {
            street: MockedTypes.Location.Address,
            city: MockedTypes.Location.City,
            state: MockedTypes.Location.State,
            zip: MockedTypes.Location.ZipCode
        },
        bio: MockedTypes.Logic,
        animal: 'Animal'
    },
};

const start = performance.now();
const Pets = MockThis(mockPetObject)
    .with.Multiple(1, 5)
    .with.ArrayLength(1, 10)
    .with.Random('Activity', ['run', 'sleep', 'eat'])
    .with.Sequence('Color', ['red', 'blue', 'green', 'yellow'])
    .with.NewType('Animal', getType => {
        const birthdate = getType(MockedTypes.Birthday);
        const age = moment().diff(birthdate, 'year');
        const adoptedDate = getType(MockedTypes.Date);
        return {
            type: chance.animal(),
            color: getType('Color'),
            name: getType(MockedTypes.Name.First),
            weight: `${getType(MockedTypes.Number)}lbs`,
            birthdate,
            age,
            adoptedDate,
            favoriteActivity: getType('Activity'),
            bio: getType(MockedTypes.String.Paragraph),
            isGoodestBoy: true
        };
    })
    .with.Dependencies('owner.bio', ['owner.firstName', 'owner.lastName', 'owner.animal'], ({ owner: { firstName, lastName, animal } }) => {
        return `${firstName} ${lastName} adopted ${animal.name} the ${animal.type.toLowerCase()} on ${moment(animal.adoptedDate).format("dddd, MMMM Do YYYY")}. ${animal.name} loves to ${animal.favoriteActivity}.`;
    })
    .and.NullChance(1)//broken
    .as.JSON(null, 1);

console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
fs.writeFile('./example/example.json', Pets, () => { });
exec('code ./example/example.json');