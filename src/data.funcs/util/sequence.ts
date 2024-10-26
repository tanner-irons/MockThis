import { TypeFunc } from "../../models/generator";

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

export const Sequence: <T>(sequence: T[]) => TypeFunc<T, Chance.Chance> = <T>(sequence: T[]) => {
    let sequenceQueue = sequenceGenerator(sequence);
    return (chance, blueprint) => {
        const result = sequenceQueue.next();
        if (result.done) {
            sequenceQueue = sequenceGenerator(sequence);
            return sequenceQueue.next().value as T;
        }

        return result.value;
    }
};