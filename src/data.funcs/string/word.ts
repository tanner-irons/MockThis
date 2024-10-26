import { TypeFunc } from "../../models/generator";

export const Word: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.word();
}