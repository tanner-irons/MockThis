import { TypeFunc } from "../../models/generator";

export const LastName: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.last();
}