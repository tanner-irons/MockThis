import { TypeFunc } from "../../models/generator";

export const Paragraph: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.paragraph();
}