import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Number: GeneratorFunc<number> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.natural({ min: 1, max: 500 });
}