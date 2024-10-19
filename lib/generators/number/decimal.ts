import { GeneratorFunc } from "../../models/generator";
import { IBlueprint } from "../../models/blueprint";

export const Decimal: GeneratorFunc<number> = (chance: Chance.Chance, blueprint: IBlueprint) => {
    return chance.floating({ min: 1, max: 500 });
}