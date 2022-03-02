import { Blueprint } from './mockthis.blueprint';
import { IWith } from './mockthis.with';
import { IAs } from './mockthis.as';
import { IMockThis } from './models/mockthis';
import * as As from "./mockthis.as";
import * as With from "./mockthis.with";

export { MockTypes } from './mockthis.types';

const _makeFlat = function(schema: Record<string, any>): Record<string, any>{
    let flattened: Record<string, any> = {};
    let stack: { parent?: string, nodes: Record<string, any> }[] = [{ nodes: schema }];

    while (stack.length > 0) {
        let current = stack.pop();
        if (!current || Object.keys(current.nodes || {}).length === 0) {
            continue;
        }
        let keys = Object.keys(current.nodes);
        for (let i = 0; i < keys.length; i++) {
            let key = current.parent ? current.parent + '.' + keys[i] : keys[i];
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

export class MockThis<T> implements IMockThis<T> {

    constructor(_schema: T) {
        if (!_schema) {
            throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        }
        if (!(_schema instanceof Object) || _schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }
        const flatSchema: Record<string, any> = _makeFlat(_schema);
        const schema = Object.keys(flatSchema).map(prop => {
            return {
                property: prop,
                type: flatSchema[prop],
                dependencies: []
            }
        });
        this.blueprint = new Blueprint(schema);
    }

    blueprint: Blueprint;

    as: IAs = {
        JSON:  As.Json.bind(this),
        Object: As.Obj.bind(this)
    };

    with: IWith = {
        Multiple: With.Multiple.bind(this),
        ArrayLength: With.ArrayLength.bind(this),
        Required: With.Required.bind(this),
        NewType: With.NewType.bind(this),
        Random: With.Random.bind(this),
        Sequence: With.Sequence.bind(this),
        DateFormat: With.DateFormat.bind(this),
        Dependencies: With.Dependencies.bind(this),
        NullChance: With.NullChance.bind(this)
    }

    and = this.with;
}
