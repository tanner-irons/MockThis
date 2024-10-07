import { IBlueprint } from "../../models/blueprint";
import { IGenerator } from "../generator";

class RandomGenerator<T> implements IGenerator<T> {
    constructor(private items: T[]) { }

    generateValue(): T {
        const randomIndex = Math.floor(Math.random() * this.items.length);
        return this.items[randomIndex];
    }
}

export const Random = <T>(sequence: T[]) => {
    return class implements IGenerator<T> {
        items: T[] = sequence;

        constructor(
            chance: Chance.Chance,
            blueprint: IBlueprint
        ) { }


        generateValue() {
            const randomIndex = Math.floor(Math.random() * this.items.length);
            return this.items[randomIndex];
        }
    }
}