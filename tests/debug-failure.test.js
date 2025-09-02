/**
 * @fileoverview Debug test to understand the parsing failure
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug parsing failure", function () {
    it("should debug step by step", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test cases with increasing complexity
        const testCases = [
            "a { @apply outline-ring; }",   // Should work
            "a { @apply outline-ring/; }",  // Should fail - incomplete
            "a { @apply outline-ring/50; }", // Our target case
        ];
        
        testCases.forEach((testCase, index) => {
            console.log(`\n--- Test Case ${index + 1}: ${testCase} ---`);
            try {
                const result = parse(testCase);
                const plainObject = toPlainObject(result);
                console.log("Success! Prelude type:", plainObject.children[0].block.children[0].prelude.type);
                if (plainObject.children[0].block.children[0].prelude.type === "AtrulePrelude") {
                    console.log("Children:", plainObject.children[0].block.children[0].prelude.children.map(child => ({
                        type: child.type,
                        name: child.name || child.value || "unknown"
                    })));
                } else if (plainObject.children[0].block.children[0].prelude.type === "Raw") {
                    console.log("Raw value:", plainObject.children[0].block.children[0].prelude.value);
                }
            } catch (error) {
                console.log("Parse error:", error.message);
            }
        });
    });
});