import { IBlueprint } from "../../models/blueprint";

export const Constant = <T>(value: T) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => value;
};