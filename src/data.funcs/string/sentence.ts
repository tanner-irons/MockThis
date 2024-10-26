import { TypeFunc } from "../../models/generator";

export const Sentence: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.sentence();
}