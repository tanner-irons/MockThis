import { TypeFunc } from "../../models/generator";

export const Async: <T>(asyncCallback: () => Promise<T>) => TypeFunc<Promise<T>, Chance.Chance> = <T>(asyncCallback: () => Promise<T>) => {
    return (chance, blueprint) => asyncCallback();
}