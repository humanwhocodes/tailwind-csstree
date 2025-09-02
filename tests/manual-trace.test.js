/**
 * @fileoverview Test to manually trace the parser execution
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Manual parser trace", function () {
    it("should manually trace parsing", () => {
        const { parse, toPlainObject, lexer } = fork(tailwind3);
        
        // First, check what tokens we get for our problematic input
        console.log("=== Checking prelude validation ===");
        const preludeTest = lexer.matchAtrulePrelude('apply', 'outline-ring/50');
        console.log("Prelude matches:", preludeTest.error === null);
        
        // Now let's see what happens when we parse the full CSS
        console.log("\n=== Parsing full CSS ===");
        try {
            const css = "a { @apply outline-ring/50; }";
            console.log("Parsing:", css);
            
            const ast = parse(css);
            const plain = toPlainObject(ast);
            
            console.log("Parse successful");
            console.log("AST type:", plain.type);
            console.log("Rule count:", plain.children.length);
            
            const rule = plain.children[0];
            console.log("Block children:", rule.block.children.length);
            
            const apply = rule.block.children[0];
            console.log("Apply rule type:", apply.type);
            console.log("Apply name:", apply.name);
            console.log("Prelude type:", apply.prelude.type);
            
            if (apply.prelude.type === "Raw") {
                console.log("Raw value:", apply.prelude.value);
                console.log("This indicates the custom parser failed and fell back to raw parsing");
            } else if (apply.prelude.type === "AtrulePrelude") {
                console.log("Children count:", apply.prelude.children.length);
                apply.prelude.children.forEach((child, index) => {
                    console.log(`Child ${index}:`, child.type, child.name || child.value);
                });
            }
        } catch (error) {
            console.log("Parse error:", error.message);
            console.log("Stack:", error.stack);
        }
    });
});