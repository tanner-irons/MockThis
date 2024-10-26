import { TypeFunc } from "../../models/generator";

export const IntegerRange: (min: number, max: number) => TypeFunc<number, Chance.Chance> = (min, max) => {
    return (chance, blueprint) => chance.integer({ min, max });
}