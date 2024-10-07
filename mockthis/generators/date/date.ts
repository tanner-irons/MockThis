import moment from "moment";
import { IGenerator } from "../generator";
import { IBlueprint } from "../../models/blueprint";

export class Date implements IGenerator<string> {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    generateValue(blueprint: IBlueprint): string {
        return moment(this.chance.date()).format(blueprint.formats.date);
    }
}