import { IBlueprint } from "./models/blueprint";
import { Blueprint } from "./blueprint";

export interface IBlueprintBuilder {
    getBlueprint(): IBlueprint;
    setMultiple(min: number, max?: number): void;
    setArrayLength(min: number, max?: number): void;
    setRequired(required: string[]): void;
    setDateFormat(dateFormat: string): void;
    setNullValueChance(nullChance: number): void;
}

export class BlueprintBuilder implements IBlueprintBuilder {
    private blueprint: IBlueprint;

    constructor() { 
        this.blueprint = new Blueprint();
    }

    getBlueprint(): IBlueprint {
        return this.blueprint;
    }

    setMultiple(min: number, max?: number): void {
        if (min == null || isNaN(min)) {
            throw new TypeError("Min must be a number.");
        } else if (min < 0) {
            throw new Error("Min must be non-negative.");
        } else if (max == null || isNaN(max)) {
            throw new TypeError("Max must be a number.");
        } else if (max < 0) {
            throw new Error("Max must be non-negative.");
        } else if (min > max) {
            throw new Error("Min must be less than or equal to Max.");
        }
        this.blueprint.total = {
            min: min,
            max: max ?? min,
        };
    }

    setArrayLength(min: number, max?: number): void {
        if (min == null || isNaN(min)) {
            throw new TypeError("Min must be a number.");
        } else if (min < 0) {
            throw new Error("Min must be non-negative.");
        } else if (max == null || isNaN(max)) {
            throw new TypeError("Max must be a number.");
        } else if (max < 0) {
            throw new Error("Max must be non-negative.");
        } else if (min > max) {
            throw new Error("Min must be less than or equal to Max.");
        }
        this.blueprint.array = {
            min: min,
            max: max ?? min,
        };
    }

    setRequired(required: string[]): void {
        if (!Array.isArray(required)) {
            throw new TypeError("Required properties must be an array.");
        }
        if (this.blueprint.required.length > 0) {
            throw new Error("Required properties have already been declared.");
        }
        this.blueprint.required = required;
    }

    setDateFormat(dateFormat: string): void {
        this.blueprint.formats.date = dateFormat;
    }

    setNullValueChance(nullChance: number): void {
        if (isNaN(nullChance)) {
            throw new TypeError("Null chance argument must be a number.");
        }
        if (nullChance < 0 || nullChance > 1) {
            throw new Error("Null chance argument must be a number between 0 and 1.");
        }
        this.blueprint.nullValueChance = nullChance;
    }
}