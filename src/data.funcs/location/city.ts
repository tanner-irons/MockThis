import { TypeFunc } from "../../models/generator";

export const City: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.city();
}