import { TypeFunc as TypeFunc } from "./generator";

export interface IBlueprint {
    total: IMinMax;
    required: string[];
    formats: IFormats;
    array: IMinMax;
    nullValueChance: number;
    getRandomTotalLength: () => number;
    getRandomArrayLength: () => number;
    shouldGenerateNullValue: (key: string) => boolean;
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

export interface IFormats {
    date?: string;
}