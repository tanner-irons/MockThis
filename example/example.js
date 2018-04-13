'use strict';

let mockPetObject = {
    owner: {
        firstName: MockThis.Types.Name.First,
        lastName: MockThis.Types.Name.Last
    },
    name: MockThis.Types.Name.First,
    birthday: MockThis.Types.Birthday,
    type: 'Animal',
    description: MockThis.Types.Text.Paragraph,
    notes: [{
        text: MockThis.Types.Text.Sentence,
        date: MockThis.Types.Date,
        results: {
            test: MockThis.Types.Text.Word,
            score: MockThis.Types.Number
        }
    }]
};

let start = performance.now();
let Pets = MockThis(mockPetObject)
    .with.Multiple(100)
    .and.MaxArray(15)
    .and.MinArray(15)
    .and.NewType('Animal', (getGenerator) => {
        let name = getGenerator('First').First();
        return {
            animal: 'animal',
            name: name
        }
    })
    .and.DateFormat('dd-mm-yyyy')
    .as.Object();
console.log('Mock data generated in: ' + (performance.now() - start) + 'ms');
console.log(Pets);