import { IBlueprint } from "../../models/blueprint";
import { GeneratorFunc } from "../../models/generator";

export const Random: <T>(items: T[]) => GeneratorFunc<T> = <T>(items: T[]) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
};