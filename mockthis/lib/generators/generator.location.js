'use strict';

let Chance = new (require('chance'))();

let _getCity = () => {
    return Chance.city();
};

let _getState = () => {
    return Chance.state({ country: 'us', 'full': true });
}

let _getCoordinates = () => {
    return Chance.coordinates();
}

let _getZipCode = () => {
    return Chance.zip();
}

let _getAddress = () => {
    return Chance.address();
}

module.exports = {
    Address: _getAddress,
    City: _getCity,
    Coordinates: _getCoordinates,
    State: _getState,
    ZipCode: _getZipCode
};