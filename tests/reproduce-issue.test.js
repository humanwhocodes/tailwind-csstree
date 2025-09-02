/**
 * @fileoverview Test to reproduce the parsing error with @apply outline-ring/50
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";

describe("Issue Reproduction", function () {
    describe("@apply with slash notation", () => {
        const problematicCSS = `
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
        `;

        const simpleCase = `a { @apply outline-ring/50; }`;

        it("should parse @apply with slash notation in Tailwind 3", () => {
            const { parse, toPlainObject } = fork(tailwind3);
            try {
                const result = parse(simpleCase);
                console.log("Tailwind 3 result:", JSON.stringify(toPlainObject(result), null, 2));
                assert.ok(result, "Should parse successfully");
            } catch (error) {
                console.error("Tailwind 3 error:", error.message);
                throw error;
            }
        });

        it("should parse @apply with slash notation in Tailwind 4", () => {
            const { parse, toPlainObject } = fork(tailwind4);
            try {
                const result = parse(simpleCase);
                console.log("Tailwind 4 result:", JSON.stringify(toPlainObject(result), null, 2));
                assert.ok(result, "Should parse successfully");
            } catch (error) {
                console.error("Tailwind 4 error:", error.message);
                throw error;
            }
        });

        it("should test @apply border-border outline-ring/50 specifically", () => {
            const specificCase = "* { @apply border-border outline-ring/50; }";
            
            console.log("Testing:", specificCase);
            
            const { parse, toPlainObject } = fork(tailwind3);
            try {
                const result = parse(specificCase);
                console.log("Parsed successfully:", JSON.stringify(toPlainObject(result), null, 2));
                assert.ok(result, "Should parse successfully");
            } catch (error) {
                console.error("Parse error:", error.message);
                console.error("Full error:", error);
                throw error;
            }
        });

        it("should parse complex @apply with slash notation in Tailwind 3", () => {
            const { parse } = fork(tailwind3);
            const result = parse(problematicCSS);
            assert.ok(result, "Should parse successfully");
        });

        it("should parse complex @apply with slash notation in Tailwind 4", () => {
            const { parse } = fork(tailwind4);
            const result = parse(problematicCSS);
            assert.ok(result, "Should parse successfully");
        });
    });
});