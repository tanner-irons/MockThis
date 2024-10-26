import { TypeFunc } from "../../models/generator";

export const Constant: <T>(value: T) => TypeFunc<T, Chance.Chance> = <T>(value: T) => {
    return (chance, blueprint) => value;
};