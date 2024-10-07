import * as fs from 'fs';
import { exec } from 'child_process';
import { Address, Animal, City, Constant, Date, FirstName, LastName, MockThis, Number, Sequence, State, ZipCode } from "../dist/index"

const mockPetObject = {
    id: Sequence([1, 2, 3]),
    value: Constant("test"),
    nested: [{
        test: Constant("nested")
    }],
    animal: Animal,
    owner: {
        firstName: FirstName,
        lastName: LastName,
        birthdate: Date,
        favoriteNumbers: [Number],
        address: {
            street: Address,
            city: City,
            state: State,
            zip: ZipCode
        },
        // bio: MockedTypes.Logic,
        // animal: 'Animal'
    }
};

const start = performance.now();
const pets = new MockThis(mockPetObject)
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
fs.writeFile('./example/example.json', pets, () => { });
exec('code ./example/example.json');