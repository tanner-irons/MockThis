import Chance from "chance";
import { BlueprintBuilder, IBlueprintBuilder } from "./blueprint.builder";
import { ISchema } from "./models/schema";
import { DataGenerator, IDataGenerator } from "./data.generator";
import { SchemaTransformer } from "./schema.transformer";
import { Utils } from "./utils";

export class MockThisInstance<T extends ISchema> {
    constructor(
        private blueprintBuilder: IBlueprintBuilder,
        private dataGenerator: IDataGenerator<T>,
        private schema: T
    ) {
        if (!schema) {
            throw new ReferenceError('Provided schema is undefined. Please provide a valid object literal as the schema.');
        }
        if (!(schema instanceof Object) || schema instanceof Array) {
            throw new TypeError('Provided schema should be a valid object literal.');
        }
    }

    addDependency(prop: string, deps: string[], callback?: () => any): this {
        // TODO: figure this out
        return this;
    }

    setMultiple(min: number, max?: number): this {
        this.blueprintBuilder.setMultiple(min, max);
        return this;
    }

    setArrayLength(min: number, max?: number): this {
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

    setNullValueChance(chance: number): this {
        this.blueprintBuilder.setNullValueChance(chance);
        return this;
    }

    asObject(): Promise<T | T[]> {
        return this.dataGenerator.asObject(this.schema, this.blueprintBuilder.blueprint);
    }

    asJson(replacer?: (this: any, key: string, value: any) => any, space?: string | number): Promise<string> {
        return this.dataGenerator.asJSON(this.schema, this.blueprintBuilder.blueprint, replacer, space);
    }
}

export const MockThis = <T extends ISchema, L>(schema: T, randomDataGenerator?: L) => {
    const blueprintBuilder = new BlueprintBuilder();
    const schemaTransformer = new SchemaTransformer();
    const utils = new Utils();
    const dataGenerator = new DataGenerator(schemaTransformer, randomDataGenerator ?? new Chance() as L, utils);
    return new MockThisInstance(blueprintBuilder, dataGenerator, schema);
};