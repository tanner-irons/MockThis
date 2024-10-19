import moment from "moment";
import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const DateTime: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    if (blueprint.formats.date) {
        return moment(chance.date()).format(blueprint.formats.date);
    }
    return moment(chance.date()).toISOString();
}