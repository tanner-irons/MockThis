import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Currency: GeneratorFunc<{ code: string, name: string }> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.currency();
}