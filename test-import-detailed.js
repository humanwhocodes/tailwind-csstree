/**
 * Test various import statements
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

const testCases = [
    "@import 'tailwindcss';",
    "@import url('tailwindcss');",
    "@import 'tailwindcss' layer(base);",
    "@import 'tailwindcss' prefix(foo);",
    "@import 'tailwindcss' prefix(foo) layer(base);",
];

for (const testCase of testCases) {
    console.log(`\nTesting: ${testCase}`);
    try {
        const result = toPlainObject(parse(testCase));
        console.log("Parse result:");
        console.log(JSON.stringify(result.children[0].prelude, null, 2));
        
        // Try to validate the at-rule
        if (result.children[0].prelude.type !== "Raw") {
            const validation = lexer.matchAtrulePrelude("import", result.children[0].prelude);
            console.log("Validation:", validation.error ? validation.error.message : "SUCCESS");
        }
    } catch (error) {
        console.log("ERROR:", error.message);
    }
}