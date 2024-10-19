import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Boolean: GeneratorFunc<boolean> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.bool();
}