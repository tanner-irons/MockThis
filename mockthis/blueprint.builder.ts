import moment from "moment";
import { IBlueprint } from "./models/blueprint";

export interface IBlueprintBuilder {
    blueprint: IBlueprint;
    setMultiple(min: number, max?: number): void;
    setArrayLength(min: number, max?: number): void;
    setRequired(required: string[]): void;
    setDateFormat(dateFormat: string): void;
    setNullChance(nullChance: number): void;
}

class BlueprintBuilder implements IBlueprintBuilder{
    blueprint: IBlueprint = {
        total: {
            min: 1,
            max: 1
        },
        required: [],
        formats: {},
        array: {
            min: 1,
            max: 10
        },
        nullChance: .25
    };

    setMultiple(
        min: number,
        max?: number
    ) {
        if (isNaN(min)) {
            throw new TypeError('Min argument must be a number.');
        } else if (min < 0) {
            throw new Error('Min argument must be a positive integer or 0.');
        } else if (max !== undefined && isNaN(max)) {
            throw new TypeError('Max argument must be a number.');
        } else if (max !== undefined && max < 0) {
            throw new Error('Max argument must be a positive integer or 0.');
        }
        this.blueprint.total = {
            min: min,
            max: max ?? min,
        };
    }

    setArrayLength(
        min: number,
        max?: number
    ) {
        if (isNaN(min)) {
            throw new TypeError('Min argument must be a number.');
        } else if (min < 0) {
            throw new Error('Min argument must be a positive integer or 0.');
        } else if (max !== undefined && isNaN(max)) {
            throw new TypeError('Max argument must be a number.');
        } else if (max !== undefined && max < 0) {
            throw new Error('Max argument must be a positive integer or 0.');
        }
        this.blueprint.array = {
            min: min,
            max: max ?? min,
        };
    }

    setRequired(
        required: string[]
    ) {
        if (!Array.isArray(required)) {
            throw new TypeError('Required properties must be an array.');
        }
        if (this.blueprint.required.length > 0) {
            console.warn(
                'Required properties have already been declared. Please call Required method only once.'
            );
            return;
        }
        this.blueprint.required = required;
    }

    setDateFormat(dateFormat: string) {
        if (moment().format(dateFormat).toString() === 'InvalidDate') {
            throw new TypeError('Date format argument must be a valid date format.');
        }
        this.blueprint.formats.date = dateFormat;
    }

    setNullChance( nullChance: number) {
        if (isNaN(nullChance)) {
            throw new TypeError('Null chance argument must be a number.');
        }
        if (nullChance < 0 || nullChance > 1) {
            throw new Error('Null chance argument must be a number between 0 and 1.');
        }
        this.blueprint.nullChance = nullChance;
    }
}

export default BlueprintBuilder;