import { TypeFunc } from "../../models/generator";

export const Coordinates: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.coordinates();
}