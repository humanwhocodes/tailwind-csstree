/**
 * @fileoverview Test to create a variant that would use TailwindUtilityClass with slash
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Test slash in TailwindUtilityClass", function () {
    it("should test variant with slash", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test a variant with slash - this should use TailwindUtilityClass and trigger my slash parsing code
        const variantWithSlash = "a { @apply hover:bg-blue-500/50; }";
        console.log("Testing:", variantWithSlash);
        
        try {
            const result = parse(variantWithSlash);
            const plain = toPlainObject(result);
            
            console.log("Prelude type:", plain.children[0].block.children[0].prelude.type);
            
            if (plain.children[0].block.children[0].prelude.type === "AtrulePrelude") {
                const children = plain.children[0].block.children[0].prelude.children;
                console.log("Children:", children.map(child => ({
                    type: child.type,
                    name: child.name?.name || child.name || 'N/A',
                    variant: child.variant?.name || 'N/A'
                })));
                
                // This should show a TailwindUtilityClass with the slash in the name
                if (children[0].type === "TailwindUtilityClass") {
                    console.log("Success: TailwindUtilityClass with name:", children[0].name.name);
                }
            } else if (plain.children[0].block.children[0].prelude.type === "Raw") {
                console.log("Failed: Raw value:", plain.children[0].block.children[0].prelude.value);
            }
        } catch (error) {
            console.log("Parse error:", error.message);
        }
    });
});