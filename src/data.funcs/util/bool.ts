import { TypeFunc } from "../../models/generator";

export const Bool: TypeFunc<boolean, Chance.Chance> = (chance, blueprint) => {
    return chance.bool();
}