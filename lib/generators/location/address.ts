import { IBlueprint } from "../../models/blueprint";
import { GeneratorFunc } from "../../models/generator";

export const Address: GeneratorFunc<string> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.address();
}