import moment from "moment";
import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Date: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return moment(chance.date()).format(blueprint.formats.date);
}