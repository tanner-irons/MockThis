import { expect, describe, test, beforeEach } from "vitest";
import { BlueprintBuilder, IBlueprintBuilder } from "../lib/blueprint.builder";

describe("BlueprintBuilder", () => {
    let blueprintBuilder: IBlueprintBuilder;

    beforeEach(() => {
        blueprintBuilder = new BlueprintBuilder();
    });

    describe("setMultiple", () => {
        test("should set the min and max values for the multiple property", () => {
            blueprintBuilder.setMultiple(1, 5);
            expect(blueprintBuilder.blueprint.total).toEqual({ min: 1, max: 5 });
        });
    });

    describe("setArrayLength", () => {
        test("should set the min and max values for the array property", () => {
            blueprintBuilder.setArrayLength(1, 5);
            expect(blueprintBuilder.blueprint.array).toEqual({ min: 1, max: 5 });
        });

        test("should set the min and max values for the array property to the same value if max is not provided", () => {
            blueprintBuilder.setArrayLength(1);
            expect(blueprintBuilder.blueprint.array).toEqual({ min: 1, max: 1 });
        });

        test("should throw a TypeError if min is not a number", () => {
            expect(() => blueprintBuilder.setArrayLength(null as any)).toThrow(TypeError);
        });

        test("should throw an Error if min is less than 0", () => {
            expect(() => blueprintBuilder.setArrayLength(-1)).toThrow(Error);
        });

        test("should throw an Error if max is less than 0", () => {
            expect(() => blueprintBuilder.setArrayLength(1, -1)).toThrow(Error);
        });

        test("should throw an Error if min is greater than max", () => {
            expect(() => blueprintBuilder.setArrayLength(5,1)).toThrow(Error);
        });
    });

    describe("setRequired", () => {
        test("should set the required properties", () => {
            blueprintBuilder.setRequired(["name", "age"]);
            expect(blueprintBuilder.blueprint.required).toEqual(["name", "age"]);
        });

        test("should throw a TypeError if required is not an array", () => {
            expect(() => blueprintBuilder.setRequired(null as any)).toThrow(TypeError);
        });

        test("should throw an Error if required properties have already been set", () => {
            blueprintBuilder.blueprint.required = ["oldProp"];
            expect(() => blueprintBuilder.setRequired(["newProp"])).toThrow(Error);
        });
    });

    describe("setDateFormat", () => {
        test("should set the date format", () => {
            blueprintBuilder.setDateFormat("DD/MM/YYYY");
            expect(blueprintBuilder.blueprint.formats.date).toEqual("DD/MM/YYYY");
        });
    });

    describe("withNullChance", () => {
        test("should set the null chance", () => {
            blueprintBuilder.setNullChance(0.5);
            expect(blueprintBuilder.blueprint.nullChance).toEqual(0.5);
        });

        test("should throw a TypeError if nullChance is not a number", () => {
            expect(() => blueprintBuilder.setNullChance(null as any)).toThrow(TypeError);
        });

        test("should throw an Error if nullChance is less than 0", () => {
            expect(() => blueprintBuilder.setNullChance(-1)).toThrow(Error);
        });

        test("should throw an Error if nullChance is greater than 1", () => {
            expect(() => blueprintBuilder.setNullChance(1.1)).toThrow(Error);
        });
    });
    
});