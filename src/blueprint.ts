import { IBlueprint, IFormats, IMinMax } from "./models/blueprint";

export class Blueprint implements IBlueprint {
    total: IMinMax = {
        min: 1,
        max: 1
    };
    required: string[] = [];
    formats: IFormats = {};
    array: IMinMax = {
        min: 1,
        max: 5
    };
    nullValueChance: number = 0;

    getRandomTotalLength(): number {
        const { min, max } = this.total;
        return max && min !== max
            ? Math.floor(Math.random() * (max - min + 1)) + min
            : min;
    }

    getRandomArrayLength(): number {
        const { min, max } = this.array;
        return max && min !== max
            ? Math.floor(Math.random() * (max - min + 1)) + min
            : min;
    }

    shouldGenerateNullValue(key: string): boolean {
        if (this.required.some(r => this.keyIncludes(key, r))) {
            return false;
        }
        return Math.random() < this.nullValueChance;
    }

    private keyIncludes(basePath: string, targetPath: string): boolean {
        const components = basePath.split(".").map((component) =>
            component.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );

        const pattern =
            "^" +
            components
                .map((component) => component + "(\\[\\d+\\])?")
                .join("\\.") +
            "$";

        return new RegExp(pattern).test(targetPath);
    }
}