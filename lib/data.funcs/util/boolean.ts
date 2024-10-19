import { TypeFunc } from "../../models/generator";

export const Boolean: TypeFunc<boolean, Chance.Chance> = (chance, blueprint) => {
    return chance.bool();
}