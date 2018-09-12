'use strict';

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
    .with.Multiple(123)
    .with.MaxArray(15)
    .with.MinArray(2)
    .with.NewType('Animal', (getType) => {
        let quantity = getType(MockThis.Types.Number);
        return {
            animal: chance.animal(),
            quantity: quantity
        }
    })
    .with.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log(performance.now() - start);
console.log(Pets);