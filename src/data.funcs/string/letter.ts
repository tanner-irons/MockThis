import { TypeFunc } from "../../models/generator";

export const Letter: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.letter();
}