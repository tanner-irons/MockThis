import { TypeFunc } from "../../models/generator";

export const Number: TypeFunc<number, Chance.Chance> = (chance, blueprint) => {
    return chance.natural({ min: 1, max: 500 });
}