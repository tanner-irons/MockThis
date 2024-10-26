import { TypeFunc } from "../../models/generator";

export const Currency: TypeFunc<{ code: string, name: string }, Chance.Chance> = (chance, blueprint) => {
    return chance.currency();
}