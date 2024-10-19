import { IBlueprint } from "../../models/blueprint";
import { GeneratorFunc } from "../../models/generator";

export const Constant: <T>(value: T) => GeneratorFunc<T> = <T>(value: T) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => value;
};