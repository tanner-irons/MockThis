import toposort from "toposort";
import Chance from "chance";
import BlueprintBuilder, { IBlueprintBuilder } from "./blueprint.builder";
import DataGenerator from "./data.generator";
import { SchemaItem } from "./models/blueprint";
import { IStack } from "./models/stack";
import { NewableGenerator } from "./generators/generator";
import GeneratorFactory from "./generators/generator.factory";
import { ISchema } from "./models/schema";

class MockThis {
    private schema: SchemaItem[];
    private blueprintBuilder: IBlueprintBuilder;
    private dataGenerator: DataGenerator<ISchema>;

    constructor(schema: ISchema) {
        if (!schema) {
            throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        }
        if (!(schema instanceof Object) || schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }

        this.blueprintBuilder = new BlueprintBuilder();

        const chance = new Chance();
        const generatorFactory = new GeneratorFactory(chance, this.blueprintBuilder.blueprint);
        
        this.dataGenerator = new DataGenerator(generatorFactory);

        const flattenedSchema = this.flattenSchema(schema);
        const schemaItems = Object.keys(flattenedSchema)
            .map(prop => ({
                property: prop,
                type: flattenedSchema[prop],
                dependencies: []
            }));

        this.schema = this.sortSchema(schemaItems);
    }

    // START PUBLIC API

    addDependency(prop: string, deps: string[], callback?: () => any): this {
        // TODO: figure this out
        return this;
    }

    setMultiple(min: number, max: number = 1): this {
        this.blueprintBuilder.setMultiple(min, max);
        return this;
    }

    setArrayLength(min: number, max: number = 10): this {
        this.blueprintBuilder.setArrayLength(min, max);
        return this;
    }

    setRequired(required: string[]): this {
        this.blueprintBuilder.setRequired(required);
        return this;
    }

    setDateFormat(format: string): this {
        this.blueprintBuilder.setDateFormat(format);
        return this;
    }

    setNullChance(chance: number): this {
        this.blueprintBuilder.setNullChance(chance);
        return this;
    }

    asObject() {
        return this.dataGenerator.asObject(this.schema, this.blueprintBuilder.blueprint);
    }

    asJson() {
        return this.dataGenerator.asJSON(this.schema, this.blueprintBuilder.blueprint);
    }

    // END PUBLIC API

    private flattenSchema(schema: ISchema) {
        let flattened: Record<string, NewableGenerator> = {};
        let stack: IStack[] = [{ parent: undefined, nodes: schema }];

        while (stack.length > 0) {
            let current = stack.pop();
            if (!current || Object.keys(current.nodes || {}).length === 0) {
                continue;
            }
            let keys = Object.keys(current.nodes);
            for (let i = 0; i < keys.length; i++) {
                let key = current.parent ? current.parent + '.' + keys[i] : keys[i];
                if (current.nodes[keys[i]] instanceof Array) {
                    stack.push({
                        parent: key + '[0]',
                        nodes: current.nodes[keys[i]][0]
                    })
                }
                else if (Object.getPrototypeOf(current.nodes[keys[i]]) === Object.prototype) {
                    stack.push({
                        parent: key,
                        nodes: current.nodes[keys[i]]
                    });
                } else {
                    flattened[key] = current.nodes[keys[i]];
                }
            }
        }

        return flattened;
    }

    private sortSchema(schema: SchemaItem[]): SchemaItem[] {
        const deps = schema.flatMap(prop => prop.dependencies
            .reduce<[string, string | undefined][]>((acc, curr) => {
                if (prop.property.includes(curr)) {
                    throw new Error(`Property "${prop.property}" has invalid dependency "${curr}". A property cannot depend on itself or its ancestors.`)
                }

                acc.push([curr, prop.property]);

                return acc;
            }, [[prop.property, undefined]])
        );

        return toposort(deps)
            .flatMap(dep => schema.filter(item => item.property.includes(dep) || item.property.includes(dep + '.0')))
            .filter(dep => !!dep);
    }
}

export default MockThis;