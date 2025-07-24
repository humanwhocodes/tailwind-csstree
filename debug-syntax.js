/**
 * Debug the syntax parsing
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

// Test if our syntax definition is actually being used
console.log("Testing lexer for import rule:");
try {
    const result = lexer.matchAtrulePrelude("import", parse("'test' prefix(foo)", { context: 'atrule-prelude' }));
    console.log("Lexer result:", result.error ? result.error.message : "SUCCESS");
} catch (error) {
    console.log("Lexer error:", error.message);
}

// Test layer() function to compare
try {
    const result = lexer.matchAtrulePrelude("import", parse("'test' layer(base)", { context: 'atrule-prelude' }));
    console.log("Layer lexer result:", result.error ? result.error.message : "SUCCESS");
} catch (error) {
    console.log("Layer lexer error:", error.message);
}

// Check what types are available
console.log("\nAvailable types with 'layer':");
console.log(Object.keys(lexer.types).filter(k => k.includes('layer')));

// Check what the import at-rule looks like  
console.log("\nCurrent syntax config:");
console.log("atrules:", Object.keys(lexer.structure.atrule).filter(k => k === 'import'));
console.log("import structure:", lexer.structure.atrule.import);