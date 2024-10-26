import Chance from "chance";
import { BlueprintBuilder, IBlueprintBuilder } from "./blueprint.builder";
import { ISchema } from "./models/schema";
import { DataGenerator, IDataGenerator } from "./data.generator";
import { SchemaTransformer } from "./schema.transformer";

export class MockThisInstance<T extends ISchema> {
    constructor(
        private blueprintBuilder: IBlueprintBuilder,
        private dataGenerator: IDataGenerator<T>,
        private schema: T
    ) {
        if (!schema) {
            throw new ReferenceError("Provided schema is undefined. Please provide a valid object literal as the schema.");
        }
        if (!(schema instanceof Object) || schema instanceof Array) {
            throw new TypeError("Provided schema should be a valid object literal.");
        }
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
        return this.dataGenerator.asObject(this.schema, this.blueprintBuilder.getBlueprint());
    }

    asJson(replacer?: (this: any, key: string, value: any) => any, space?: string | number): Promise<string> {
        return this.dataGenerator.asJSON(this.schema, this.blueprintBuilder.getBlueprint(), replacer, space);
    }
}

export const MockThis = <T extends ISchema, L>(schema: T, randomValueGenerator?: L) => {
    const schemaTransformer = new SchemaTransformer<T>();
    const dataGenerator = new DataGenerator<T, L>(schemaTransformer, randomValueGenerator ?? new Chance() as L);
    const blueprintBuilder = new BlueprintBuilder();
    return new MockThisInstance<T>(blueprintBuilder, dataGenerator, schema);
};