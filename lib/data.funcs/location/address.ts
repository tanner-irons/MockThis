import { TypeFunc } from "../../models/generator";

export const Address: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.address();
}