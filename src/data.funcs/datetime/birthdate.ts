import { TypeFunc } from "../../models/generator";
import moment from "moment";

export const Birthdate: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    if (blueprint.formats.date) {
        return moment(chance.birthday()).format(blueprint.formats.date);
    }
    return moment(chance.birthday()).toISOString();
}