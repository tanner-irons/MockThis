import { TypeFunc } from "../../models/generator";

export const State: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.state();
}