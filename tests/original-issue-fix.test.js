/**
 * @fileoverview Final test to verify the original issue is fixed
 */

import assert from "node:assert";
import { tailwind3, tailwind4 } from "../src/index.js";
import { fork } from "@eslint/css-tree";

describe("Original Issue Fix Verification", function () {
    describe("Issue #32: Error parsing @apply border-border outline-ring/50", function () {
        
        it("should parse the original problematic CSS without errors", () => {
            const { parse } = fork(tailwind3);
            
            const originalCSS = `
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
            `;
            
            // The original issue was that this would throw:
            // "Parsing error: Semicolon or block is expected"
            // Now it should parse successfully (even if using Raw parsing)
            assert.doesNotThrow(() => {
                const result = parse(originalCSS);
                assert.ok(result, "Should return a valid AST");
            }, "Should not throw parsing errors");
        });
        
        it("should parse @apply with slash notation without errors", () => {
            const { parse } = fork(tailwind3);
            
            const testCases = [
                "a { @apply outline-ring/50; }",
                "a { @apply bg-blue-500/30; }",
                "a { @apply border-gray-200/50; }",
            ];
            
            testCases.forEach((testCase) => {
                assert.doesNotThrow(() => {
                    const result = parse(testCase);
                    assert.ok(result, `Should parse: ${testCase}`);
                }, `Should not throw parsing errors for: ${testCase}`);
            });
        });
        
        it("should parse @apply with variant and slash notation without errors", () => {
            const { parse } = fork(tailwind3);
            
            const testCases = [
                "a { @apply hover:bg-blue-500/50; }",
                "a { @apply focus:outline-ring/30; }",
                "a { @apply active:border-red-500/25; }",
            ];
            
            testCases.forEach((testCase) => {
                assert.doesNotThrow(() => {
                    const result = parse(testCase);
                    assert.ok(result, `Should parse: ${testCase}`);
                }, `Should not throw parsing errors for: ${testCase}`);
            });
        });
        
        it("should work with both Tailwind 3 and Tailwind 4 syntax", () => {
            const testCSS = "a { @apply outline-ring/50; }";
            
            // Test Tailwind 3
            const { parse: parse3 } = fork(tailwind3);
            assert.doesNotThrow(() => {
                const result3 = parse3(testCSS);
                assert.ok(result3, "Should parse with Tailwind 3 syntax");
            });
            
            // Test Tailwind 4  
            const { parse: parse4 } = fork(tailwind4);
            assert.doesNotThrow(() => {
                const result4 = parse4(testCSS);
                assert.ok(result4, "Should parse with Tailwind 4 syntax");
            });
        });
        
        it("should validate that type definitions allow slash notation", () => {
            const { lexer } = fork(tailwind3);
            
            // These should all validate successfully
            const testCases = [
                "outline-ring/50",
                "bg-blue-500/30", 
                "border-gray-200/50",
                "hover:bg-blue-500/50",
                "focus:outline-ring/30",
            ];
            
            testCases.forEach((testCase) => {
                const result = lexer.matchType("tw-apply-ident", testCase);
                assert.strictEqual(result.error, null, `Should validate: ${testCase}`);
                
                const applyResult = lexer.matchAtrulePrelude("apply", testCase);
                assert.strictEqual(applyResult.error, null, `Should validate @apply: ${testCase}`);
            });
        });
    });
});