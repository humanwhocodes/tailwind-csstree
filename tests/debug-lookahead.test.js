/**
 * @fileoverview Test to debug the lookahead logic in @apply parser
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug @apply lookahead", function () {
    it("should test manual parsing of outline-ring/50", () => {
        // Let's manually trace what happens in the apply parser
        const { parse } = fork(tailwind3);
        
        // First, let's see if our TailwindUtilityClass parser works in isolation
        console.log("Testing if we can parse as a direct utility class...");
        
        try {
            // Try parsing just the class name in a different context
            const testCase = "a { background: outline-ring/50; }";
            console.log("Trying:", testCase);
            const result = parse(testCase);
            console.log("Basic parsing works for values");
        } catch (error) {
            console.log("Error in basic parsing:", error.message);
        }
        
        // Now test our actual case
        console.log("\nTesting our actual case...");
        try {
            const testCase = "a { @apply outline-ring/50; }";
            const result = parse(testCase);
            console.log("Parse successful, but probably uses Raw fallback");
        } catch (error) {
            console.log("Parse error:", error.message);
        }
    });
});