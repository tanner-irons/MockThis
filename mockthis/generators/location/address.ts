import { IBlueprint } from "../../models/blueprint";
import { IGenerator } from "../generator";

export class Address implements IGenerator<string> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(blueprint: IBlueprint): string {
        return this.chance.address();
    }
}