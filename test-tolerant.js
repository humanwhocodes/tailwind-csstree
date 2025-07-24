/**
 * Test parsing with error tolerance
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject } = fork(tailwind4);

// Test parsing with tolerant mode to see more details
const tests = [
    "@import 'test';",
    "@import 'test' layer(base);", 
    "@import 'test' prefix(foo);",
];

for (const test of tests) {
    console.log(`\nTesting: ${test}`);
    try {
        // Parse without tolerant mode first
        const normal = toPlainObject(parse(test));
        console.log("Normal parse:", normal.children[0].prelude.type);
        
        // Try with tolerant mode
        const tolerant = toPlainObject(parse(test, { tolerant: true }));
        console.log("Tolerant parse:", tolerant.children[0].prelude.type);
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}