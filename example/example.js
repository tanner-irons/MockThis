"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var child_process_1 = require("child_process");
var index_1 = require("../dist/index");
var chance_1 = require("chance");
var ids = Array.from({ length: 100 }, function (_, i) { return i + 1; });
var mockPetObject = {
    id: (0, index_1.Sequence)(ids),
    active: (0, index_1.Constant)(true),
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
    },
    siblings: [
        {
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
        }
    ]
};
var start = performance.now();
var pets = (0, index_1.MockThis)(mockPetObject, new chance_1.Chance())
    .setMultiple(5)
    .setArrayLength(5)
    .setDateFormat('DD/MM/YYYY')
    .asObject();
// .withNullChance(1)//broken
console.log('Mock data generated in: ' + (performance.now() - start) + ' ms');
fs.writeFile('./example/example.json', pets, function () { });
(0, child_process_1.exec)('code ./example/example.json');
