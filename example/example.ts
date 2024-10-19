import * as fs from 'fs';
import { exec } from 'child_process';
import { Address, Animal, City, Constant, Date, FirstName, LastName, MockThis, Number, Random, Sequence, State, ZipCode } from "../dist/index"
import { Chance } from 'chance';

const ids = Array.from({ length: 100 }, (_, i) => i + 1);

const mockPetObject = {
    id: Sequence(ids),
    active: Constant(true),
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
    }
};

const start = performance.now();
const pets = MockThis(mockPetObject, new Chance())
    .setMultiple(5)
    .setArrayLength(5)
    .setDateFormat('DD/MM/YYYY')
    .setNullChance(0.1) // broken
    .asJson();

console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
fs.writeFile('./example/example.json', pets, () => { });
exec('code ./example/example.json');