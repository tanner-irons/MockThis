import { TypeFunc } from "../../models/generator";

export const ZipCode: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.zip();
}