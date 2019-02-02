'use strict';

module.exports = {
    Number: Symbol('Number'),
    Boolean: Symbol('Boolean'),
    Date: Symbol('Date'),
    Today: Symbol('Today'),
    Yesterday: Symbol('Yesterday'),
    Tomorrow: Symbol('Tomorrow'),
    Birthday: Symbol('Birthday'),
    String: {
        Word: Symbol('String.Word'),
        Sentence: Symbol('String.Sentence'),
        Paragraph: Symbol('String.Paragraph')
    },
    Name: {
        First: Symbol('Name.First'),
        Last: Symbol('Name.Last')
    },
    Location: {
        Address: Symbol('Location.Address'),
        City: Symbol('Location.City'),
        Coordinates: Symbol('Location.Coordinates'),
        State: Symbol('Location.State'),
        Country: Symbol('Location.Country'),
        ZipCode: Symbol('Location.ZipCode')
    },
    PhoneNumber: Symbol('PhoneNumber'),
    Email: Symbol('Email'),
    NewType: Symbol('NewType'),
    Dependent: Symbol('Dependent')
};