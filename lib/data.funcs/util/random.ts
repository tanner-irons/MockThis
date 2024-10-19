import { TypeFunc } from "../../models/generator";

export const Random: <T>(items: T[]) => TypeFunc<T, Chance.Chance> = <T>(items: T[]) => {
    return (chance, blueprint) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }
};