import * as fs from "fs";
import { exec } from "child_process";
import { Address, Animal, Birthdate, City, Constant, Coordinates, Country, Currency, DateTime, Decimal, Dep, Dollar, Email, Euro, FirstName, LastName, Letter, Bool, MockThis, Number, Paragraph, PhoneNumber, Random, Sentence, Sequence, SocialSecurityNumber, State, Url, Word, ZipCode } from "../dist/index"
import { Async } from "../lib/data.funcs/util/async";

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black", "white", "brown", "pink"];

const schema = {
    datetime: {
        datetime: DateTime,
        birthdate: Birthdate
    },
    location: {
        address: Address,
        city: City,
        coordinates: Coordinates,
        country: Country,
        state: State,
        zip: ZipCode
    },
    person: {
        firstName: FirstName,
        lastName: LastName,
        ssn: SocialSecurityNumber
    },
    money: {
        currency: Currency,
        dollar: Dollar,
        euro: Euro,
    },
    numbers: {
        decimal: Decimal,
        number: Number,
    },
    string: {
        letter: Letter,
        paragraph: Paragraph,
        word: Word,
        sentence: Sentence,
    },
    web: {
        email: Email,
        url: Url,
    },
    misc: {
        animal: Animal,
        phoneNumber: PhoneNumber
    },
    util: {
        // async: Async(async () => {
        //     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        //     return response.json();
        // }),
        dep: Dep(
            ["location.address", "location.city", "location.state", "location.zip"],
            ([address, city, state, zip], getValue) => {
                const randomDate = getValue(DateTime);
                return `The address generated is ${address}, ${city}, ${state}, ${zip}. The random date is ${randomDate}.`;
            }
        ),
        bool: Bool,
        constant: Constant("Constant Value"),
        random: Random(colors),
        sequence: Sequence(colors),
    },
    nested: {
        values: {
            singleValue: Constant("Nested Value"),
            arrayValues: [Sequence(colors)],
        },
        arrayception: [[Sequence(colors)]]
    }
};

const start = performance.now();
MockThis(schema)
    .setMultiple(2,5)
    .setArrayLength(3,5)
    .setDateFormat("DD/MM/YYYY")
    .setNullValueChance(0)
    .setRequired(["datetime"])
    .asJson()
    .then(pets => {
        console.log("Mock data generated in: " + (performance.now() - start).toFixed(2) + " ms");
        fs.writeFile("./example/example.json", pets, () => { });
        exec("code ./example/example.json");
    });

