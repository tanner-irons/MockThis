import { IGenerator } from "../generator";
import { IBlueprint } from "../../models/blueprint";

export class Paragraph implements IGenerator<string> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(blueprint: IBlueprint): string {
        return this.chance.paragraph();
    }
}