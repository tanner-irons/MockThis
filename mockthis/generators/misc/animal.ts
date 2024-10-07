import { IGenerator } from "../generator";
import { IBlueprint } from "../../models/blueprint";

export class Animal implements IGenerator<string> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(): string {
        return this.chance.animal();
    }
}