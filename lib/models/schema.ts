export interface ISchema {
    [key: string]: ISchema | ISchema[] | any | any[];
}