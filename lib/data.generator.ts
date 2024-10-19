import { IBlueprint, SchemaItem } from './models/blueprint';
import { ISchemaTransformer } from './schema.transformer';
import { ISchema } from './models/schema';

export interface IDataGenerator<T extends ISchema> {
  asObject(schema: T, blueprint: IBlueprint): T | T[];
  asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number): string;
}

export class DataGenerator<T extends ISchema, L> implements IDataGenerator<T> {
  private arrayMatcher: RegExp = /^(.*\[(\d+)\])(.*)$/;

  constructor(
    private schemaTransformer: ISchemaTransformer,
    private randomDataGenerator: L
  ) { }

  asObject(schema: T, blueprint: IBlueprint): T | T[] {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    return this.generateData(preparedSchema, blueprint);
  }

  asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number) {
    const preparedSchema = this.schemaTransformer.prepareSchema(schema, blueprint);
    const data = this.generateData(preparedSchema, blueprint);
    return JSON.stringify(data, replacer, space);
  }

  private generateData(schemaItems: SchemaItem[], blueprint: IBlueprint): T | T[] {
    const data: T[] = [];
    const arrayLength = this.getArrayLength(blueprint.total.min, blueprint.total.max);

    for (let i = 0; i < arrayLength; i++) {
      const rawObject = this.generateObject(schemaItems, blueprint);
      const finalizedObject = this.schemaTransformer.finalizeSchema(rawObject);
      data.push(finalizedObject);
    }

    return data.length > 1 ? data : data[0];
  }

  private generateObject(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    const schemaData: Record<string, any> = {};

    for (const schemaItem of schemaItems) {
      const arrayMatch = schemaItem.property.match(this.arrayMatcher);
      if (arrayMatch) {
        const expandedKeys = this.expandKeyRecursively(schemaItem.property);
        for (const newKey of expandedKeys) {
          const generatedValue = this.generateValue(schemaItem, blueprint);
          if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
            schemaData[newKey] = generatedValue;
          }
        }
      } else {
        const generatedValue = this.generateValue(schemaItem, blueprint);
        if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
          schemaData[schemaItem.property] = generatedValue;
        }
      }
    }

    return schemaData;
  }

  private generateValue(schemaItem: SchemaItem, blueprint: IBlueprint) {
    if (!schemaItem) {
      return;
    };

    const generatorFunc = Array.isArray(schemaItem.type) ? schemaItem.type[0] : schemaItem.type;
    return generatorFunc(this.randomDataGenerator, blueprint);
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

  private getArrayLength(min: number, max: number) {
    return max && min !== max
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : min;
  }
}