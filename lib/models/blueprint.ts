import { TypeFunc as TypeFunc } from "./generator";

export interface IBlueprint {
    total: IMinMax
    required: string[],
    formats: {
        date?: string
    }
    array: IMinMax,
    nullValueChance: number
};

export interface SchemaItem {
    property: string;
    getValue: TypeFunc<any, any>;
    dependencies: string[];
}

export interface IMinMax {
    min: number;
    max: number;
}