import { GeneratorFunc } from "./generator";

export interface IBlueprint {
    total: IMinMax
    required: string[],
    formats: {
        date?: string
    }
    array: IMinMax,
    nullChance: number
};

export interface SchemaItem {
    property: string;
    type: GeneratorFunc<any>;
    dependencies: string[];
}

export interface IMinMax {
    min: number;
    max: number;
}