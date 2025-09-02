/**
 * @fileoverview Isolate TailwindUtilityClass testing
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Isolate TailwindUtilityClass issue", function () {
    it("should isolate TailwindUtilityClass problem", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // First, let's manually verify that a working case still works
        console.log("=== Working case: hover:bg-blue-500 ===");
        try {
            const result1 = parse("a { @apply hover:bg-blue-500; }");
            const plain1 = toPlainObject(result1);
            console.log("Result:", plain1.children[0].block.children[0].prelude.type);
            if (plain1.children[0].block.children[0].prelude.type === "AtrulePrelude") {
                console.log("SUCCESS: Uses AtrulePrelude with TailwindUtilityClass");
            }
        } catch (error) {
            console.log("ERROR:", error.message);
        }
        
        // Now test if TailwindUtilityClass can handle a slash case
        console.log("\n=== Problem case: hover:bg-blue-500/50 ===");
        try {
            const result2 = parse("a { @apply hover:bg-blue-500/50; }");
            const plain2 = toPlainObject(result2);
            console.log("Result:", plain2.children[0].block.children[0].prelude.type);
            
            if (plain2.children[0].block.children[0].prelude.type === "Raw") {
                console.log("PROBLEM: Falls back to Raw");
                console.log("Raw value:", plain2.children[0].block.children[0].prelude.value);
                
                // This means either:
                // 1. The @apply parser isn't calling TailwindUtilityClass 
                // 2. TailwindUtilityClass is throwing an error when parsing hover:bg-blue-500/50
            } else {
                console.log("SUCCESS: Uses AtrulePrelude");
            }
        } catch (error) {
            console.log("ERROR:", error.message);
        }
        
        // Let's also test the non-variant slash case
        console.log("\n=== Non-variant slash case: bg-blue-500/50 ===");
        try {
            const result3 = parse("a { @apply bg-blue-500/50; }");
            const plain3 = toPlainObject(result3);
            console.log("Result:", plain3.children[0].block.children[0].prelude.type);
            
            if (plain3.children[0].block.children[0].prelude.type === "Raw") {
                console.log("PROBLEM: Falls back to Raw");
                console.log("Raw value:", plain3.children[0].block.children[0].prelude.value);
                
                // This means the @apply parser isn't detecting the slash case correctly
            } else {
                console.log("SUCCESS: Uses AtrulePrelude");
            }
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    });
});