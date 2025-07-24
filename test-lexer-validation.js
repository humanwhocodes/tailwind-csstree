/**
 * Test lexer validation which might be causing the "crash"
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

const problemCSS = "@import 'tailwindcss' prefix(foo);";
console.log("Testing lexer validation on prefix import:");

try {
    const result = toPlainObject(parse(problemCSS));
    const atrule = result.children[0];
    
    console.log("Parsed atrule:", {
        name: atrule.name,
        preludeType: atrule.prelude.type
    });
    
    // Try to validate the at-rule - this might be where the crash occurs
    console.log("Attempting lexer validation...");
    const validation = lexer.matchAtrulePrelude(atrule.name, atrule.prelude);
    console.log("Validation result:", validation.error ? validation.error.message : "SUCCESS");
    
} catch (error) {
    console.log("ERROR during validation:");
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);
}

// Also test what happens with a simple import for comparison
console.log("\n--- Testing simple import for comparison ---");
try {
    const simple = toPlainObject(parse("@import 'test';"));
    const simpleAtrule = simple.children[0];
    
    console.log("Simple atrule:", {
        name: simpleAtrule.name,
        preludeType: simpleAtrule.prelude.type
    });
    
    const simpleValidation = lexer.matchAtrulePrelude(simpleAtrule.name, simpleAtrule.prelude);
    console.log("Simple validation:", simpleValidation.error ? simpleValidation.error.message : "SUCCESS");
    
} catch (error) {
    console.log("ERROR during simple validation:", error.message);
}