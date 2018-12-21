'use strict';

let Chance = new (require('chance'))();

let _getCity = function () {
    return Chance.city();
};

let _getState = function () {
    return Chance.state({ country: 'us', 'full': true });
}

let _getCoordinates = function () {
    return Chance.coordinates();
}

let _getZipCode = function () {
    return Chance.zip();
}

let _getAddress = function () {
    return Chance.address();
}

module.exports = {
    Address: _getAddress,
    City: _getCity,
    Coordinates: _getCoordinates,
    State: _getState,
    ZipCode: _getZipCode
};