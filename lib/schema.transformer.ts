import toposort from "toposort";
import { DepTypeFunc, TypeFunc } from "./models/generator";
import { IBlueprint, SchemaItem } from "./models/blueprint";
import { ISchema } from "./models/schema";
import { IStack } from "./models/stack";

export interface ISchemaTransformer {
  prepareSchema(schema: ISchema, blueprint: IBlueprint): SchemaItem[];
  finalizeSchema(schema: ISchema): any;
}

export class SchemaTransformer implements ISchemaTransformer {
  constructor() { }

  prepareSchema(schema: ISchema, blueprint: IBlueprint): SchemaItem[] {
    const flattened = this.flattenSchema(schema, blueprint);
    const schemaItems: SchemaItem[] = Object.entries(flattened)
      .map(([property, getValue]) => ({
        property,
        getValue,
        dependencies: (getValue as DepTypeFunc<any, any>).deps ?? []
      }));

    return this.sortSchema(schemaItems);
  }

  finalizeSchema(schema: ISchema): any {
    // TODO: figure out a way to keep generated schema in the same order as the original schema
    const output: any = {};

    for (const key in schema) {
      const value = schema[key];
      const parts = this.parseKey(key);
      let currentLevel = output;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          // Assign the value to the last key or index
          if (typeof part === "number") {
            if (!Array.isArray(currentLevel)) {
              currentLevel = [];
            }
            currentLevel[part] = value;
          } else {
            currentLevel[part] = value;
          }
        } else {
          const nextPart = parts[i + 1];
          if (typeof part === "number") {
            // Ensure currentLevel is an array
            if (!Array.isArray(currentLevel)) {
              currentLevel = [];
            }
            // Initialize the array element if it doesn"t exist
            if (currentLevel[part] === undefined) {
              currentLevel[part] = typeof nextPart === "number" ? [] : {};
            }
            currentLevel = currentLevel[part];
          } else {
            // Ensure currentLevel is an object
            if (typeof currentLevel !== "object" || Array.isArray(currentLevel)) {
              currentLevel = {};
            }
            // Initialize the object property if it doesn"t exist
            if (currentLevel[part] === undefined) {
              currentLevel[part] = typeof nextPart === "number" ? [] : {};
            }
            currentLevel = currentLevel[part];
          }
        }
      }
    }

    return output;
  }

  private parseKey(key: string): (string | number)[] {
    const regex = /([^\.\[\]]+)|\[(\d+)\]/g;
    const parts: (string | number)[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(key)) !== null) {
      if (match[1] !== undefined) {
        parts.push(match[1]);
      } else if (match[2] !== undefined) {
        parts.push(parseInt(match[2], 10));
      }
    }

    return parts;
  }

  private flattenSchema(schema: ISchema, blueprint: IBlueprint): Record<string, TypeFunc<any, any>> {
    let flattened: Record<string, TypeFunc<any, any>> = {};
    let stack: IStack[] = [{ parent: undefined, nodes: schema }];

    while (stack.length > 0) {
      let current = stack.pop();
      if (!current || Object.keys(current.nodes || {}).length === 0) {
        continue;
      }
      let keys = Array.isArray(current.nodes) ? current.nodes.map((n, i) => i) : Object.keys(current.nodes);
      for (let i = 0; i < keys.length; i++) {
        let key;
        if (current.parent) {
          if (isNaN(keys[i] as number)) {
            key = current.parent + "." + keys[i];
          } else {
            key = current.parent + "[0]";
          }
        } else {
          if (isNaN(keys[i] as number)) {
            key = keys[i];
          }
        }
        if (current.nodes[keys[i]] instanceof Array) {
          key += "[0]";
          if (current.nodes[keys[i]][0] instanceof Function) {
            flattened[key!] = current.nodes[keys[i]][0];
          } else {
            stack.push({
              parent: key,
              nodes: current.nodes[keys[i]][0]
            });
          }
        }
        else if (Object.getPrototypeOf(current.nodes[keys[i]]) === Object.prototype) {
          stack.push({
            parent: key,
            nodes: current.nodes[keys[i]]
          });
        } else {
          flattened[key!] = current.nodes[keys[i]];
        }
      }
    }

    return flattened;
  }

  private sortSchema(schema: SchemaItem[]): SchemaItem[] {
    const deps = schema.flatMap(prop => prop.dependencies
      .reduce<[string, string | undefined][]>((acc, curr) => {
        if (prop.property.includes(curr)) {
          throw new Error(`Property "${prop.property}" has invalid dependency "${curr}". A property cannot depend on itself.`)
        }

        acc.push([curr, prop.property]);

        return acc;
      }, [[prop.property, undefined]])
    );

    return toposort(deps)
      .flatMap(dep => schema.filter(item => item.property.includes(dep) || item.property.includes(dep + ".0")))
      .filter(dep => !!dep);
  }
}