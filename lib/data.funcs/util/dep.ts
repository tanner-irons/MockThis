import { IBlueprint } from "../../models/blueprint";
import { DepTypeFunc, TypeFunc } from "../../models/generator";

export const Dep: <T>(
    deps: string[],
    depCallback: (deps: any[], getValue: <V>(TypeFunc: TypeFunc<V, Chance.Chance>) => V) => T
) => TypeFunc<T, Chance.Chance> = <T>(
        deps: string[],
        depCallback: (deps: any[], getValue: <V>(TypeFunc: TypeFunc<V, Chance.Chance>) => V) => T
    ) => {
        const depCb: DepTypeFunc<any, any> = (chance: Chance.Chance, blueprint: IBlueprint, deps: string[]) => {
            const getValue = (getValue: TypeFunc<any, any>): Promise<any> | any => {
                if (getValue.name === 'depCb') {
                    throw new Error('Dep TypeFunc cannot be nested');
                }
                return getValue(chance, blueprint, [])
            };
            return depCallback(deps, getValue);
        }

        depCb.deps = deps;

        return depCb;
    };