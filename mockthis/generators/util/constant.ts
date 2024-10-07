import { IBlueprint } from "../../models/blueprint";
import { IGenerator } from "../generator";

export function Constant<T>(value: T) {
    return class implements IGenerator<T> {
        value: T = value;

        constructor(
            chance: Chance.Chance,
            blueprint: IBlueprint
        ) { }


        generateValue() {
            return this.value;
        }
    }
}