import { TypeFunc } from "../../models/generator";

export const Url: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.url();
}