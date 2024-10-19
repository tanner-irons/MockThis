import { IBlueprint, SchemaItem } from './models/blueprint';
import { ISchemaTransformer } from './schema.transformer';
import { ISchema } from './models/schema';
import { Utils } from './utils';

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

  asObject(schema: T, blueprint: IBlueprint) {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    return this.generateData(preparedSchema, blueprint);
  }

  async asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number) {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    const data = await this.generateData(preparedSchema, blueprint);
    return JSON.stringify(data, replacer, space);
  }

  private async generateData(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    const data: T[] = [];
    const arrayLength = Utils.getRandomArrayLength(blueprint.total.min, blueprint.total.max);

    for (let i = 0; i < arrayLength; i++) {
      const rawObject = await this.generateObject(schemaItems, blueprint);
      const finalizedObject = this.schemaTransformer.finalizeSchema(rawObject);
      data.push(finalizedObject);
    }

    return data.length > 1 ? data : data[0];
  }

  private async generateObject(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    const schemaData: Record<string, any> = {};

    for (const schemaItem of schemaItems) {
      const arrayMatch = schemaItem.property.match(this.arrayMatcher);
      if (arrayMatch) {
        const expandedKeys = this.expandKeyRecursively(schemaItem.property);
        for (const newKey of expandedKeys) {
          const generatedValue = await this.generateValue(schemaItem, blueprint);
          if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
            schemaData[newKey] = generatedValue;
          }
        }
      } else {
        const generatedValue = await this.generateValue(schemaItem, blueprint);
        if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
          schemaData[schemaItem.property] = generatedValue;
        }
      }
    }

    return schemaData;
  }

  private async generateValue(schemaItem: SchemaItem, blueprint: IBlueprint) {
    if (!schemaItem) {
      return;
    };

    const generatorFunc = Array.isArray(schemaItem.type) ? schemaItem.type[0] : schemaItem.type;
    const value = await generatorFunc(this.randomDataGenerator, blueprint);
    return value;
  }

  private expandKeyRecursively(key: string) {
    const indexRegex = /(\w+)\[(\d+)\]/g;
    const matches = [];
    let match;

    while ((match = indexRegex.exec(key)) !== null) {
      matches.push({
        base: match[1],
        maxIndex: parseInt(match[2], 10),
        startIndex: match.index,
        length: match[0].length
      });
    }

    if (matches.length === 0) {
      return [key];
    }

    const ranges = matches.map(info => {
      const indices = [];
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
      let newKey = key;
      for (let k = matches.length - 1; k >= 0; k--) {
        let info = matches[k];
        let newIndexPart = `${info.base}[${combo[k]}]`;
        newKey =
          newKey.slice(0, info.startIndex) +
          newIndexPart +
          newKey.slice(info.startIndex + info.length);
      }
      expandedKeys.push(newKey);
    }

    return expandedKeys;
  }
}