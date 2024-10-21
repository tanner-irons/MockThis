import { IBlueprint } from "./models/blueprint";
import { Blueprint } from "./blueprint";

export interface IBlueprintBuilder {
    blueprint: IBlueprint;
    setMultiple(min: number, max?: number): void;
    setArrayLength(min: number, max?: number): void;
    setRequired(required: string[]): void;
    setDateFormat(dateFormat: string): void;
    setNullValueChance(nullChance: number): void;
}

export class BlueprintBuilder implements IBlueprintBuilder {
    public blueprint: IBlueprint;

    constructor() { 
        this.blueprint = new Blueprint();
    }

    setMultiple(min: number, max?: number): void {
        if (min == undefined || min == null || isNaN(min)) {
            throw new TypeError("Min argument must be a number.");
        } else if (min < 0) {
            throw new Error("Min argument must be a positive integer or 0.");
        } else if (max && isNaN(max)) {
            throw new TypeError("Max argument must be a number.");
        } else if (max && max < 0) {
            throw new Error("Max argument must be a positive integer or 0.");
        } else if (max && min > max) {
            throw new Error("Min argument must be less than or equal to Max argument.");
        }
        this.blueprint.total = {
            min: min,
            max: max ?? min,
        };
    }

    setArrayLength(min: number, max?: number): void {
        if (min == undefined || min == null || isNaN(min)) {
            throw new TypeError("Min argument must be a number.");
        } else if (min < 0) {
            throw new Error("Min argument must be a positive integer or 0.");
        } else if (max && isNaN(max)) {
            throw new TypeError("Max argument must be a number.");
        } else if (max && max < 0) {
            throw new Error("Max argument must be a positive integer or 0.");
        } else if (max && min > max) {
            throw new Error("Min argument must be less than or equal to Max argument.");
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