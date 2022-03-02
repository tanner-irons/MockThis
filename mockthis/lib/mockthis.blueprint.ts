import topsort from "topsort";
import { Schema } from "./models/schema";

export class Blueprint {

    constructor(public schema: Schema[]) {}
    
    total = {
        min: 1,
        max: 1
    };
    required = [];
    formats: any = {};
    array = {
        min: 1,
        max: 10
    };
    nullChance = .25;

    private _sortedSchema: Schema[];
    get sortedSchema(): Schema[] {
        if (this._sortedSchema) return this._sortedSchema;

        const deps: string[][] = [];
        this.schema.forEach(prop => {
            deps.push(...prop.dependencies.reduce((acc, curr) => {
                if (prop.property.includes(curr)) {
                    throw new Error(`Property "${prop.property}" has invalid dependency "${curr}". A property cannot depend on itself or the entirety of its ancestors.`)
                }
                acc.push([curr, prop.property]);
                return acc;
            }, [[prop.property]]));
        });
        this._sortedSchema = topsort(deps)
            .flatMap(dep => this.schema.filter(item => item.property.includes(dep) || item.property.includes(dep + '.0')))
            .filter(dep => !!dep);

        return this._sortedSchema;
    }
}