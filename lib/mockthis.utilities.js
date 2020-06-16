import * as GeneratorFactory from './generators/generator.factory.js';

let _getDefaultType = function (blueprint, callingName) {
    return function (type) {
        if (callingName && callingName === type) {
            throw new TypeError(`Cannot nest user-defined type: ${type} inside of itself.`);
        }
        return GeneratorFactory.getInstanceOf(type)(null, blueprint);
    }
}

let _makeFlat = function(schema) {
    let flattened = {};
    let stack = [{ parent: null, nodes: schema }];

    while (stack.length > 0) {
        let current = stack.pop();
        if (!current || Object.keys(current.nodes || {}).length === 0) {
            continue;
        }
        let keys = Object.keys(current.nodes);
        for (let i = 0; i < keys.length; i++) {
            let key = current.parent ? `${current.parent}.${keys[i]}` : keys[i];
            if (current.nodes[keys[i]] instanceof Object) {
                stack.push({
                    parent: key,
                    nodes: current.nodes[keys[i]]
                });
            }
            else {
                flattened[key] = current.nodes[keys[i]];
            }
        }
    }

    return flattened;
}

let _makeUnflat = function (schema) {
    let unflat = {};
    let keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
        let current = unflat;
        let parts = keys[i].split('.');
        for (let j = 0; j < parts.length - 1; j++) {
            if (!current[parts[j]]) {
                current[parts[j]] = {};
            }
            current = current[parts[j]];
        }
        current[parts[parts.length - 1]] = schema[keys[i]];
    }
    
    return unflat;
}

let _getRandomArrayLength = function (min, max) {
    return max && min !== max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
};

module.exports = {
    getDefaultType: _getDefaultType,
    getRandomArrayLength: _getRandomArrayLength,
    makeFlat: _makeFlat,
    makeUnflat: _makeUnflat
}