import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Url: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.url();
}