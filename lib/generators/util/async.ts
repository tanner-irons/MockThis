import { GeneratorFunc } from "../../models/generator";

export const Async: <T>(asyncCallback: () => Promise<T>) => GeneratorFunc<Promise<T>> = <T>(asyncCallback: () => Promise<T>) => {
    return asyncCallback;
}