import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Word: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.word();
}