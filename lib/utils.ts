import { IBlueprint } from "./models/blueprint";

export class Utils {
    getRandomArrayLength(min: number, max: number): number {
        return max && min !== max
            ? Math.floor(Math.random() * (max - min + 1)) + min
            : min;
    }

    generateNullValue(blueprint: IBlueprint, key: string): boolean {
        if (blueprint.required.some(r => this.keyIncludes(r, key))) {
            return false;
        }
        return Math.random() < blueprint.nullValueChance;
    }

    private keyIncludes(basePath: string, targetPath: string): boolean {
        const components = basePath.split('.').map((component) =>
            component.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );

        const pattern =
            '^' +
            components
                .map((component) => component + '(\\[\\d+\\])?')
                .join('\\.') +
            '$';

        return new RegExp(pattern).test(targetPath);
    }
}