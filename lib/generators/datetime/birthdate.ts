import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";
import moment from "moment";

export const Birthdate: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    if (blueprint.formats.date) {
        return moment(chance.birthday()).format(blueprint.formats.date);
    }
    return moment(chance.birthday()).toISOString();
}