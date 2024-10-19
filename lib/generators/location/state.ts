import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const State: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.state();
}