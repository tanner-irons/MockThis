import { IGenerator } from "../generator";
import { IBlueprint } from "../../models/blueprint";

export class Number implements IGenerator<number> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(blueprint: IBlueprint): number {
        return this.chance.natural({ min: 1, max: 500 });
    }
}