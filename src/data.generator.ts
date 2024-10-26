import { IBlueprint, SchemaItem } from "./models/blueprint";
import { ISchemaTransformer } from "./schema.transformer";
import { ISchema } from "./models/schema";

export interface IDataGenerator<T extends ISchema> {
  asObject(schema: T, blueprint: IBlueprint): Promise<T | T[]>;
  asJSON(schema: T, blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number): Promise<string>;
}

export class DataGenerator<T extends ISchema, L> implements IDataGenerator<T> {
  constructor(
    private schemaTransformer: ISchemaTransformer<T>,
    private randomValueGenerator: L
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

    const totalLength = blueprint.getRandomTotalLength();
    for (let i = 0; i < totalLength; i++) {
      const rawSchema = await this.generateObject(schemaItems, blueprint);
      const finalizedSchema = this.schemaTransformer.finalizeSchema(rawSchema);
      data.push(finalizedSchema);
    }

    return data.length > 1 ? data : data[0];
  }

  private async generateObject(schemaItems: SchemaItem[], blueprint: IBlueprint): Promise<T> {
    const schemaData: ISchema = {};

    for (const schemaItem of schemaItems) {
      const expandedKeys = this.expandKey(schemaItem.property, blueprint);
      for (const newKey of expandedKeys) {
        if (blueprint.shouldGenerateNullValue(newKey)) {
          schemaData[newKey] = null;
          continue;
        }
        
        const deps = schemaItem.dependencies.map(dep => schemaData[dep]);
        schemaData[newKey] = await schemaItem.getValue(this.randomValueGenerator, blueprint, deps);
      }
    }

    return schemaData;
  }

  private expandKey(key: string, blueprint: IBlueprint): string[] {
    const indexRegex = new RegExp(/(\[0\]|\w+)/g);
    const matches = Array.from(
      key.matchAll(indexRegex),
      match => ({
        base: match[0] === "[0]" ? "" : match[0],
        maxIndex: blueprint.getRandomArrayLength(),
        startIndex: match.index,
        length: match[0].length
      })
    );

    if (matches.length === 0) {
      return [key];
    }

    const ranges = matches
      .filter(info => !info.base)
      .map(info => Array.from({ length: info.maxIndex }, (_, i) => i));

    const combinations = ranges.reduce(
      (acc: number[][], curr: number[]) =>
        acc.flatMap(prev => curr.map(item => [...prev, item])),
      [[]] as number[][]
    );

    const expandedKeys = [];
    for (const combo of combinations) {
      let newKey = "";
      let comboIndex = 0;
      for (const info of matches) {
        newKey += info.base ? `.${info.base}` : `[${combo[comboIndex++]}]`;
      }
      expandedKeys.push(newKey.replace(/^\./, ""));
    }

    return expandedKeys;
  }
}