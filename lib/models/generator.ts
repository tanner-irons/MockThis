import { IBlueprint } from "./blueprint";

export type GeneratorFunc<T> = (chance: Chance.Chance, blueprint: IBlueprint) => T;

export type ParamGeneratorFunc<T> = (...args: any[]) => GeneratorFunc<T>;