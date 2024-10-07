import { IBlueprint } from "../../models/blueprint";
import { IGenerator } from "../generator";

export const Sequence = <T>(sequence: T[]) => {
    return class implements IGenerator<T> {
        sequenceQueue: Generator<T>;
        sequence: T[] = sequence;

        constructor(
            chance: Chance.Chance,
            blueprint: IBlueprint
        ) {
            this.sequenceQueue = this.sequenceGenerator(sequence);
        }

        *sequenceGenerator(sequence: T[]) {
            let index = 0;
            while (true) {
                if (index >= sequence.length) {
                    return;
                }
                yield sequence[index];
                index++;
            }
        }

        generateValue(): T {
            const result = this.sequenceQueue.next();
            if (result.done) {
                this.sequenceQueue = this.sequenceGenerator(this.sequence);
                return this.sequenceQueue.next().value;
            }
    
            return result.value;
        }
    }
}