import { IBlueprint } from "../models/blueprint";
import { IGenerator } from "./generator";

class GeneratorFactory {
    constructor(
        private chance: Chance.Chance,
        private blueprint: IBlueprint
    ) { }

    getInstanceOf<T extends IGenerator<T>>(GeneratorClass: new (chance: Chance.Chance, blueprint: IBlueprint) => T): T {
        return new GeneratorClass(this.chance, this.blueprint);
    }
}

export default GeneratorFactory;