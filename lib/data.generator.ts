import { IBlueprint, SchemaItem } from "./models/blueprint";
import { ISchemaTransformer } from "./schema.transformer";
import { ISchema } from "./models/schema";

export interface IDataGenerator<T extends ISchema> {
  asObject(schema: T, blueprint: IBlueprint): Promise<T | T[]>;
  asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number): Promise<string>;
}

export class DataGenerator<T extends ISchema, L> implements IDataGenerator<T> {
  private arrayMatcher: RegExp = /^(.*\[(\d+)\])(.*)$/;

  constructor(
    private schemaTransformer: ISchemaTransformer,
    private randomDataGenerator: L
  ) { }

  asObject(schema: T, blueprint: IBlueprint): Promise<T | T[]> {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    return this.generateData(preparedSchema, blueprint);
  }

  async asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number): Promise<string> {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    const data = await this.generateData(preparedSchema, blueprint);
    return JSON.stringify(data, replacer, space);
  }

  private async generateData(schemaItems: SchemaItem[], blueprint: IBlueprint): Promise<T | T[]> {
    const data: T[] = [];
    const totalLength = blueprint.getRandomArrayLength();

    for (let i = 0; i < totalLength; i++) {
      const rawSchema = await this.generateObject(schemaItems, blueprint);
      const finalizedSchema = this.schemaTransformer.finalizeSchema(rawSchema);
      data.push(finalizedSchema);
    }

    return data.length > 1 ? data : data[0];
  }

  private async generateObject(schemaItems: SchemaItem[], blueprint: IBlueprint): Promise<ISchema> {
    const schemaData: Record<string, any> = {};

    for (const schemaItem of schemaItems) {
      const arrayMatch = schemaItem.property.match(this.arrayMatcher);
      if (arrayMatch) {
        const expandedKeys = this.expandKey(schemaItem.property, blueprint);
        for (const newKey of expandedKeys) {
          const deps = schemaItem.dependencies.map(dep => schemaData[dep]);
          const generatedValue = blueprint.forceNullValue(newKey) ? null : await schemaItem.getValue(this.randomDataGenerator, blueprint, deps);
          schemaData[newKey] = generatedValue;
        }
      } else {
        const deps = schemaItem.dependencies.map(dep => schemaData[dep]);
        const generatedValue = blueprint.forceNullValue(schemaItem.property) ? null : await schemaItem.getValue(this.randomDataGenerator, blueprint, deps);
        schemaData[schemaItem.property] = generatedValue;
      }
    }

    return schemaData;
  }

  private expandKey(key: string, blueprint: IBlueprint): string[] {
    const indexRegex = new RegExp(/(\[0\]|\w+)/g);
    const matches = [];
    let match;

    while ((match = indexRegex.exec(key)) !== null) {
      matches.push({
        base: match[0] !== "[0]" ? match[0] : "",
        maxIndex: blueprint.getRandomArrayLength(),
        startIndex: match.index,
        length: match[0].length
      });
    }

    if (matches.length === 0) {
      return [key];
    }

    const ranges = matches.filter(info => !info.base).map(info => {
      const indices: number[] = [];
      for (let i = 0; i <= info.maxIndex - 1; i++) {
        indices.push(i);
      }
      return indices;
    });

    const combinations = [];
    const totalCombinations = ranges.reduce((acc, curr) => acc * curr.length, 1);

    for (let i = 0; i < totalCombinations; i++) {
      const combo = [];
      let idx = i;
      for (let j = ranges.length - 1; j >= 0; j--) {
        combo.unshift(ranges[j][idx % ranges[j].length]);
        idx = Math.floor(idx / ranges[j].length);
      }
      combinations.push(combo);
    }

    const expandedKeys = [];
    for (const combo of combinations) {
      let newKey = "";
      let comboIndex = 0;
      for (let i = 0; i < matches.length; i++) {
        const info = matches[i];
        newKey += info.base ? `.${info.base}` : `[${combo[comboIndex++]}]`;
      };
      expandedKeys.push(newKey.replace(/^\./, ""));
    }
    return expandedKeys;
  }
}