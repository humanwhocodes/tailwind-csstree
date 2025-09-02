/**
 * @fileoverview Test to validate the fix for slash notation
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";

describe("Slash notation fix validation", function () {
    describe("Tailwind 3", function () {
        it("should parse @apply with slash notation", () => {
            const { parse, toPlainObject } = fork(tailwind3);
            
            const result = parse("a { @apply outline-ring/50; }");
            const plain = toPlainObject(result);
            
            const prelude = plain.children[0].block.children[0].prelude;
            
            // Should NOT fall back to Raw parsing
            assert.notEqual(prelude.type, "Raw", "Should not fall back to Raw parsing");
            
            // Should use proper AtrulePrelude
            assert.equal(prelude.type, "AtrulePrelude", "Should use AtrulePrelude");
            
            // Should have the correct parsed structure
            assert.ok(prelude.children && prelude.children.length > 0, "Should have children");
        });
        
        it("should parse @apply with variant and slash notation", () => {
            const { parse, toPlainObject } = fork(tailwind3);
            
            const result = parse("a { @apply hover:bg-blue-500/50; }");
            const plain = toPlainObject(result);
            
            const prelude = plain.children[0].block.children[0].prelude;
            
            // Should NOT fall back to Raw parsing
            assert.notEqual(prelude.type, "Raw", "Should not fall back to Raw parsing");
            
            // Should use proper AtrulePrelude  
            assert.equal(prelude.type, "AtrulePrelude", "Should use AtrulePrelude");
            
            // Should have TailwindUtilityClass with slash in name
            assert.ok(prelude.children && prelude.children.length > 0, "Should have children");
            
            const child = prelude.children[0];
            if (child.type === "TailwindUtilityClass") {
                assert.ok(child.name.name.includes('/'), "Should include slash in class name");
            }
        });
        
        it("should parse complex @apply from the original issue", () => {
            const { parse, toPlainObject } = fork(tailwind3);
            
            const css = `
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
            `;
            
            const result = parse(css);
            const plain = toPlainObject(result);
            
            // Find the @apply rule
            const layerRule = plain.children[0]; // @layer
            const starRule = layerRule.block.children[0]; // *
            const applyRule = starRule.block.children[0]; // @apply
            
            // Should NOT fall back to Raw parsing
            assert.notEqual(applyRule.prelude.type, "Raw", "Should not fall back to Raw parsing");
            assert.equal(applyRule.prelude.type, "AtrulePrelude", "Should use AtrulePrelude");
        });
    });
    
    describe("Tailwind 4", function () {
        it("should parse @apply with slash notation", () => {
            const { parse, toPlainObject } = fork(tailwind4);
            
            const result = parse("a { @apply outline-ring/50; }");
            const plain = toPlainObject(result);
            
            const prelude = plain.children[0].block.children[0].prelude;
            
            // Should NOT fall back to Raw parsing
            assert.notEqual(prelude.type, "Raw", "Should not fall back to Raw parsing");
            assert.equal(prelude.type, "AtrulePrelude", "Should use AtrulePrelude");
        });
    });
});