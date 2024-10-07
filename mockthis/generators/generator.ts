import { IBlueprint } from "../models/blueprint";

export interface IGenerator<T>{
    generateValue(blueprint: IBlueprint): T;
}

export type NewableGenerator = new <T>(chance: Chance.Chance) => IGenerator<T>;