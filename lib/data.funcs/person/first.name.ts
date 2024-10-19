import { TypeFunc } from "../../models/generator";

export const FirstName: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.first();
}