import { IBlueprint } from "./blueprint";

export type TypeFunc<T, L> = (chance: L, blueprint: IBlueprint, deps: any[]) => T;
export type DepTypeFunc<T, L> = TypeFunc<T, L> & { deps: string[] };