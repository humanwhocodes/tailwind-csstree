/**
 * @fileoverview Test with temporary debugging
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug with console", function () {
    it("should test with debugging", () => {
        console.log("Creating fork...");
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Temporarily modify the parser to add debugging
        console.log("Testing simple case that works...");
        try {
            const result1 = parse("a { @apply text-center; }");
            console.log("Simple case works");
        } catch (error) {
            console.log("Simple case failed:", error.message);
        }
        
        console.log("Testing problem case...");
        try {
            const result2 = parse("a { @apply outline-ring/50; }");
            const plain = toPlainObject(result2);
            console.log("Problem case parsed as:", plain.children[0].block.children[0].prelude.type);
        } catch (error) {
            console.log("Problem case failed:", error.message);
        }
    });
});