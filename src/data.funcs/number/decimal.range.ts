import { TypeFunc } from "../../models/generator";

export const DecimalRange: (min: number, max: number) => TypeFunc<number, Chance.Chance> = (min, max) => {
    return (chance, blueprint) => chance.floating({ min, max });
}