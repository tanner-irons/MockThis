import { IBlueprint } from "../../models/blueprint";
import { ParamGeneratorFunc } from "../../models/generator";

const sequenceGenerator = function*<T>(sequence: T[]) {
    let index = 0;
    while (true) {
        if (index >= sequence.length) {
            return;
        }
        yield sequence[index];
        index++;
    }
}

export const Sequence: ParamGeneratorFunc<any> = <T>(sequence: T[]) => {
    let sequenceQueue = sequenceGenerator(sequence);
    return (chance: Chance.Chance, blueprint: IBlueprint) => {
        const result = sequenceQueue.next();
        if (result.done) {
            sequenceQueue = sequenceGenerator(sequence);
            return sequenceQueue.next().value;
        }

        return result.value;
    }
};