import { IGenerator } from "../generator";
import { IBlueprint } from "../../models/blueprint";

export class City implements IGenerator<string> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(blueprint: IBlueprint): string{
        return this.chance.city();
    }
}