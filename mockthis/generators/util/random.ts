import { IBlueprint } from "../../models/blueprint";

export const Random = <T>(items: T[]) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
};