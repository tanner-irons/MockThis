import { TypeFunc } from "../../models/generator";

export const SocialSecurityNumber: TypeFunc<string, Chance.Chance> = (chance, blueprint) => {
    return chance.ssn();
}