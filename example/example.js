"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var child_process_1 = require("child_process");
var index_1 = require("../dist/index");
var mockPetObject = {
    id: (0, index_1.Sequence)([1, 2, 3]),
    value: (0, index_1.Constant)("test"),
    nested: [{
            test: (0, index_1.Constant)("nested")
        }],
    animal: index_1.Animal,
    owner: {
        firstName: index_1.FirstName,
        lastName: index_1.LastName,
        birthdate: index_1.Date,
        favoriteNumbers: [index_1.Number],
        address: {
            street: index_1.Address,
            city: index_1.City,
            state: index_1.State,
            zip: index_1.ZipCode
        },
        // bio: MockedTypes.Logic,
        // animal: 'Animal'
    }
};
var start = performance.now();
var pets = new index_1.MockThis(mockPetObject)
    .setMultiple(5, 5)
    .setArrayLength(1, 5)
    .setDateFormat('DD/MM/YYYY')
    .asJson();
// .withMultiple(1, 5)
// .withArrayLength(1, 10)
// .withRandom('Activity', ['run', 'sleep', 'eat'])
// .withSequence('Color', ['red', 'blue', 'green', 'yellow'])
// .withNewType('Animal', getType => {
//     const birthdate = getType(MockedTypes.Birthday);
//     const age = moment().diff(birthdate, 'year');
//     const adoptedDate = getType(MockedTypes.Date);
//     return {
//         type: chance.animal(),
//         color: getType('Color'),
//         name: getType(MockedTypes.Name.First),
//         weight: `${getType(MockedTypes.Number)}lbs`,
//         birthdate,
//         age,
//         adoptedDate,
//         favoriteActivity: getType('Activity'),
//         bio: getType(MockedTypes.String.Paragraph),
//         isGoodestBoy: true
//     };
// })
// .withDependencies('owner.bio', ['owner.firstName', 'owner.lastName', 'owner.animal'], ({ owner: { firstName, lastName, animal } }) => {
//     return `${firstName} ${lastName} adopted ${animal.name} the ${animal.type.toLowerCase()} on ${moment(animal.adoptedDate).format("dddd, MMMM Do YYYY")}. ${animal.name} loves to ${animal.favoriteActivity}.`;
// })
// .withNullChance(1)//broken
// .asJSON(null, 1);
console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
fs.writeFile('./example/example.json', pets, function () { });
(0, child_process_1.exec)('code ./example/example.json');
