import { TypeFunc } from "../../models/generator";

export const Email: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.email();
}