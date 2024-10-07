import { IBlueprint, SchemaItem } from './models/blueprint';
import GeneratorFactory from './generators/generator.factory';
import { ISchema } from './models/schema';

class DataGenerator<T> {
  constructor(private generatorFactory: GeneratorFactory) { }

  asObject(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    return this.generateData(schemaItems, blueprint);
  }

  asJSON(schemaItems: SchemaItem[], blueprint: IBlueprint, replacer?: (key: string, value: unknown) => unknown, space?: string | number) {
    const data = this.generateData(schemaItems, blueprint);
    return JSON.stringify(data, replacer, space);
  }

  private getArrayLength(min: number, max: number) {
    return max && min !== max
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : min;
  }

  private makeUnflat(schemaData: Record<string, any>) {
    const unflat: ISchema = {};
    const keys = Object.keys(schemaData);
    for (const key of keys) {
      let current = unflat;
      const parts = key.split('.');

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);

        if (arrayMatch) {
          const arrayName = arrayMatch[1];
          const arrayIndex = parseInt(arrayMatch[2], 10);

          if (!current[arrayName]) {
            current[arrayName] = [];
          }

          if (!(current[arrayName] instanceof Array)) {
            throw new Error(`Expected ${arrayName} to be an array`);
          }

          if (!current[arrayName][arrayIndex]) {
            current[arrayName][arrayIndex] = {};
          }

          current = current[arrayName][arrayIndex];
        } else {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      }

      const lastPart = parts[parts.length - 1];
      const value = schemaData[key];

      if (Array.isArray(value)) {
        value.forEach(item => {
          current[lastPart] = current[lastPart] || [];
          current[lastPart].push(item);
        });
      } else {
        current[lastPart] = value;
      }
    }

    return unflat;
  }

  private generateValue(schemaItem: SchemaItem, blueprint: IBlueprint) {
    if (!schemaItem) {
      return;
    };

    const generatorType = Array.isArray(schemaItem.type) ? schemaItem.type[0] : schemaItem.type;
    const generator = this.generatorFactory.getInstanceOf(generatorType);
    return generator.generateValue(blueprint);
  }

  private generateObject(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    const schemaData: Record<string, any> = {};

    for (const schemaItem of schemaItems) {
      if ((/.0/g).test(schemaItem.property)) {
        const arrayLength = this.getArrayLength(blueprint.array.min, blueprint.array.max);

        schemaData[schemaItem.property] = [];
        for (let i = 0; i < arrayLength; i++) {
          const generatedValue = this.generateValue(schemaItem, blueprint);
          if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
            schemaData[schemaItem.property].push(generatedValue);
          }
        }
      } else {
        const generatedValue = this.generateValue(schemaItem, blueprint);
        if (generatedValue !== undefined && generatedValue !== null) { // We want to allow 0s to be generated
          schemaData[schemaItem.property] = generatedValue;
        }
      }
    }

    return this.makeUnflat(schemaData);
  }

  private generateData(schemaItems: SchemaItem[], blueprint: IBlueprint) {
    const data: Record<string, unknown>[] = [];
    const arrayLength = this.getArrayLength(blueprint.total.min, blueprint.total.max);

    for (let i = 0; i < arrayLength; i++) {
      const object = this.generateObject(schemaItems, blueprint);
      data.push(object);
    }

    return data.length > 1 ? data : data[0];
  }
}

export default DataGenerator;