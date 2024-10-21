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
        return this.total.max && this.total.min !== this.total.max
            ? Math.floor(Math.random() * (this.total.max - this.total.min + 1)) + this.total.min
            : this.total.min;
    }

    getRandomArrayLength(): number {
        return this.array.max && this.array.min !== this.array.max
            ? Math.floor(Math.random() * (this.array.max - this.array.min + 1)) + this.array.min
            : this.array.min;
    }

    forceNullValue(key: string): boolean {
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