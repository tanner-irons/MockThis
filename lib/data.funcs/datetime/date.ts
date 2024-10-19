import moment from "moment";
import { TypeFunc } from "../../models/generator";

export const DateTime: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    if (blueprint.formats.date) {
        return moment(chance.date()).format(blueprint.formats.date);
    }
    return moment(chance.date()).toISOString();
}