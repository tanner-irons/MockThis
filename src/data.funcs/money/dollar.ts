import { TypeFunc } from "../../models/generator";

export const Dollar: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.dollar();
}