/**
 * @fileoverview Debug TailwindUtilityClass parsing specifically
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug TailwindUtilityClass behavior", function () {
    it("should debug what happens with slash", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Let's test step by step
        console.log("=== Test 1: Simple variant (should work) ===");
        const simple = "a { @apply hover:bg-blue-500; }";
        const result1 = parse(simple);
        const plain1 = toPlainObject(result1);
        console.log("Type:", plain1.children[0].block.children[0].prelude.type);
        if (plain1.children[0].block.children[0].prelude.type === "AtrulePrelude") {
            console.log("Success: Uses TailwindUtilityClass");
        }
        
        console.log("\n=== Test 2: Simple class (should work) ===");
        const simple2 = "a { @apply bg-blue-500; }";
        const result2 = parse(simple2);
        const plain2 = toPlainObject(result2);
        console.log("Type:", plain2.children[0].block.children[0].prelude.type);
        if (plain2.children[0].block.children[0].prelude.type === "AtrulePrelude") {
            console.log("Success: Uses Identifier");
        }
        
        console.log("\n=== Test 3: Class with slash (problem case) ===");
        const slash = "a { @apply bg-blue-500/50; }";
        const result3 = parse(slash);
        const plain3 = toPlainObject(result3);
        console.log("Type:", plain3.children[0].block.children[0].prelude.type);
        if (plain3.children[0].block.children[0].prelude.type === "Raw") {
            console.log("Failed: Falls back to Raw - this means our detection isn't working");
        }
        
        console.log("\n=== Test 4: Variant with slash (problem case) ===");
        const variantSlash = "a { @apply hover:bg-blue-500/50; }";
        const result4 = parse(variantSlash);
        const plain4 = toPlainObject(result4);
        console.log("Type:", plain4.children[0].block.children[0].prelude.type);
        if (plain4.children[0].block.children[0].prelude.type === "Raw") {
            console.log("Failed: Falls back to Raw - this means our TailwindUtilityClass parser has an error");
        }
    });
});