import { IBlueprint } from "../../models/blueprint";
import { ParamGeneratorFunc } from "../../models/generator";

export const Constant: ParamGeneratorFunc<any> = (value: any) => {
    return (chance: Chance.Chance, blueprint: IBlueprint) => value;
};