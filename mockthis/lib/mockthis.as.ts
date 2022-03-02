import { Blueprint } from "./mockthis.blueprint";
import { IMockThis } from "./models/mockthis";

const GeneratorFactory = require('./generators/generator.factory.js');

const _getArrayLength = function (min, max) {
    return max && min !== max ? Math.floor(Math.random() * (max - min + 1)) + min : min;
};

const _getDefaultType = function (blueprint, callingName) {
    return function (type) {
        if (callingName && callingName === type) {
            throw new TypeError(`Cannot nest user-defined type: ${type} inside of itself.`);
        }
        return GeneratorFactory.getInstanceOf(type)(null, blueprint);
    }
}

const _generateValue = function (blueprint: Blueprint, prop: string, tempObject) {
    const item = blueprint.schema.find(item => item.property === prop);
    if (!item) return;
    let factoryValue = GeneratorFactory.getInstanceOf(item.property);
    if (!factoryValue || item.dependencies.length < 1) {
        if (blueprint.required.length < 1 || blueprint.required.includes(prop) || Math.random() >= blueprint.nullChance) {
            factoryValue = GeneratorFactory.getInstanceOf(item.type);
            return factoryValue(_getDefaultType(blueprint, factoryValue.userType), blueprint);
        }
        return null;
    }
    return factoryValue.call(null, _makeUnflat(tempObject));
};

export const _makeUnflat = function (schema: Record<string, any>) {
    let unflat = {};
    const keys = Object.keys(schema);
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

let _generateObject = function (blueprint: Blueprint) {
    let tempObject = {};
    blueprint.sortedSchema.forEach(prop => {
        let generatedValue;
        if ((/.0/g).test(prop.property)) {
            let arrayLength = _getArrayLength(blueprint.array.min, blueprint.array.max);
            for (let i = 0; i < arrayLength; i++) {
                generatedValue = _generateValue(blueprint, prop.property, tempObject);
                let newKey = prop.property.replace(/0/g, i.toString());
                generatedValue && (tempObject[newKey] = generatedValue);
            }
        } else {
            generatedValue = _generateValue(blueprint, prop.property, tempObject);
            generatedValue && (tempObject[prop.property] = generatedValue);
        }
    });

    return _makeUnflat(tempObject);
};

let _generateData = function (blueprint: Blueprint) {
    const tempArray = [];
    let arrayLength = _getArrayLength(blueprint.total.min, blueprint.total.max);
    for (let i = 0; i < arrayLength; i++) {
        tempArray.push(_generateObject(blueprint));
    }
    return tempArray.length > 1 ? tempArray : tempArray[0];
};

export const Obj = function<T>(this: IMockThis<T>): any {
    return _generateData(this.blueprint);
};
export const Json = function<T>(this: IMockThis<T>, replacer: () => any, space: number | string): string {
    return JSON.stringify(_generateData(this.blueprint), replacer, space);
}

export interface IAs {
    Object: typeof Obj;
    JSON: typeof Json;
}