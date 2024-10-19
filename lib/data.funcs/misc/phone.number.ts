import { TypeFunc } from "../../models/generator";

export const PhoneNumber: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.phone();
}