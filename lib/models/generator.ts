import { IBlueprint } from "./blueprint";

export type TypeFunc<T, L> = (chance: L, blueprint: IBlueprint) => T;