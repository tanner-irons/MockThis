import { IAs } from "../mockthis.as";
import { Blueprint } from "../mockthis.blueprint";
import { IWith } from "../mockthis.with";

export interface IMockThis<T> {
    blueprint: Blueprint;
    with: IWith;
    and: IWith;
    as: IAs;
}