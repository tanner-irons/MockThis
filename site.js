'use strict';

let chance = new Chance();

let Types = {
    String: 'String',
    Number: 'Number',
    Boolean: 'Boolean',
    Date: 'Date',
    Today: 'Today',
    Yesterday: 'Yesterday',
    Tomorrow: 'Tomorrow',
    Birthday: 'Birthday',
    Text: {
        Word: 'Word',
        Sentence: 'Sentence',
        Paragraph: 'Paragraph'
    },
    Name: {
        First: 'First',
        Last: 'Last'
    },
    Address: 'Address',
    Phone: 'Phone',
    Email: 'Email',
    NewType: 'NewType'
};

let mockPetObject = {
    owner: {
        firstName: Types.Name.First,
        lastName: Types.Name.Last
    },
    name: Types.Name.First,
    birthday: Types.Birthday,
    type: 'Animal',
    description: Types.Text.Paragraph,
    notes: [{
        text: Types.Text.Sentence,
        date: Types.Date,
        results: {
            test: Types.Text.Word,
            score: Types.Number
        }
    }]
};

let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(100)
    .with.ArrayMax(15)
    .with.NewType('Animal', (getGenerator) => {
        let name = getGenerator('First').First();
        return {
            animal: chance.animal(),
            name: name
        }
    })
    .with.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log(performance.now() - start);
console.log(Pets);
//document.getElementsByClassName('info')[0].innerHTML = Pets;