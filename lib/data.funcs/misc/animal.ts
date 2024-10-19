import { TypeFunc } from "../../models/generator";

export const Animal: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.animal();
}