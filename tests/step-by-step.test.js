/**
 * @fileoverview Test to verify parsing behavior step by step
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Step by step parsing", function () {
    it("should verify custom parser is called", () => {
        const { parse, toPlainObject, lexer } = fork(tailwind3);
        
        // Add some debugging to understand the flow
        console.log("\n=== Testing: outline-ring ===");
        try {
            const result1 = parse("a { @apply outline-ring; }");
            const plain1 = toPlainObject(result1);
            console.log("Result type:", plain1.children[0].block.children[0].prelude.type);
            console.log("Success: simple class works");
        } catch (error) {
            console.log("Error:", error.message);
        }
        
        console.log("\n=== Testing: outline-ring/50 ===");
        try {
            const result2 = parse("a { @apply outline-ring/50; }");
            const plain2 = toPlainObject(result2);
            console.log("Result type:", plain2.children[0].block.children[0].prelude.type);
            console.log("Result value:", plain2.children[0].block.children[0].prelude.value || "N/A");
            
            if (plain2.children[0].block.children[0].prelude.type === "AtrulePrelude") {
                console.log("Children:", plain2.children[0].block.children[0].prelude.children.map(child => ({
                    type: child.type,
                    name: child.name || "N/A"
                })));
            }
        } catch (error) {
            console.log("Error:", error.message);
        }

        // Test validation separately 
        console.log("\n=== Testing validation ===");
        const validation = lexer.matchAtrulePrelude('apply', 'outline-ring/50');
        console.log("Validation error:", validation.error);
        console.log("Validation success:", validation.error === null);
    });
});