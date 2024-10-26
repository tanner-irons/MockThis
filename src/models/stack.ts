export interface IStack {
    parent?: string | number;
    nodes: Record<string, any>;
};