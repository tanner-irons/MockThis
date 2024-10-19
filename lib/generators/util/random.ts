import { IBlueprint } from "../../models/blueprint";
import { ParamGeneratorFunc } from "../../models/generator";

export const Random: ParamGeneratorFunc<any> = <T>(items: T[]) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
};