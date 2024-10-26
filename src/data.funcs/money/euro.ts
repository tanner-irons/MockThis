import { TypeFunc } from "../../models/generator";

export const Euro: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.euro();
}