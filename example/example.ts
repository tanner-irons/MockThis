import * as fs from 'fs';
import { exec } from 'child_process';
import { Address, Animal, Birthdate, City, Constant, DateTime, Dollar, Email, FirstName, LastName, MockThis, Number, Random, Sentence, Sequence, State, Url, ZipCode } from "../dist/index"
import { Chance } from 'chance';
import { Async } from '../lib/generators/util/async';

const ids = Array.from({ length: 100 }, (_, i) => i + 1);

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white", "brown", "pink"];

const mockPetObject = {
    id: Sequence(ids),
    name: FirstName,
    type: Animal,
    adoptionDate: DateTime,
    age: Number,
    colors: [Random(colors)],
    alive: Constant(true),
    description: Sentence,
    todo: Async(async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        return response.json();
    }),
    owner: {
        firstName: FirstName,
        lastName: LastName,
        birthdate: Birthdate,
        email: Email,
        personalWebsite: Url,
        netWorth: Dollar,
        favoriteNumbers: [Number],
        address: {
            street: Address,
            city: City,
            state: State,
            zip: ZipCode
        }
    }
};

const start = performance.now();
MockThis(mockPetObject, new Chance())
    .setMultiple(5)
    .setArrayLength(1, 5)
    .setDateFormat('DD/MM/YYYY')
    .setNullChance(0.1) // broken
    .asJson()
    .then(pets => {
        console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
        fs.writeFile('./example/example.json', pets, () => { });
        exec('code ./example/example.json');
    });

