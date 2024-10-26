import { TypeFunc } from "../../models/generator";

export const Country: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.country();
}