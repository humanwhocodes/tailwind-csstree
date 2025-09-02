/**
 * @fileoverview Add temporary debug to TailwindUtilityClass
 */

// Let's temporarily add some debugging to the tailwind-class.js file
// by creating a test that just tests the TailwindUtilityClass parsing in isolation

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Test TailwindUtilityClass in isolation", function () {
    it("should test if TailwindUtilityClass can parse correctly", () => {
        // The issue is that when we call TailwindUtilityClass on input with slash,
        // it throws an error. Let's test if we can identify why.
        
        console.log("Testing TailwindUtilityClass behavior...");
        
        // Simple test: Does a working case still work?
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test that the existing working case still works
        const workingVariant = "a { @apply hover:bg-blue-500; }";
        const result1 = parse(workingVariant);
        const plain1 = toPlainObject(result1);
        
        console.log("Working variant uses:", plain1.children[0].block.children[0].prelude.type);
        
        if (plain1.children[0].block.children[0].prelude.type === "AtrulePrelude") {
            const child = plain1.children[0].block.children[0].prelude.children[0];
            console.log("Child type:", child.type);
            console.log("Child name:", child.name ? child.name.name : "N/A");
            console.log("Child variant:", child.variant ? child.variant.name : "N/A");
        }
        
        // Now let's try to understand why the slash case fails
        // The reason it falls back to Raw is that an error occurred in parsing
        console.log("\nTesting slash case...");
        
        const slashVariant = "a { @apply hover:bg-blue-500/50; }";
        const result2 = parse(slashVariant);
        const plain2 = toPlainObject(result2);
        
        console.log("Slash variant uses:", plain2.children[0].block.children[0].prelude.type);
        
        if (plain2.children[0].block.children[0].prelude.type === "Raw") {
            console.log("Raw value:", plain2.children[0].block.children[0].prelude.value);
            console.log("This means the custom parser failed and CSS-tree fell back to raw parsing");
        }
    });
});