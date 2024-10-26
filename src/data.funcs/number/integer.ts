import { TypeFunc } from "../../models/generator";

export const Integer: TypeFunc<number, Chance.Chance> = (chance, blueprint) => {
    return chance.integer({ min: -500, max: 500 });
}