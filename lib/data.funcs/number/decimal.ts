import { TypeFunc } from "../../models/generator";

export const Decimal: TypeFunc<number, Chance.Chance> = (chance, blueprint) => {
    return chance.floating({ min: 1, max: 500 });
}