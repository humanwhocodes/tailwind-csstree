/**
 * Try to reproduce the actual crash from the issue
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

// This is the exact example from the issue
const problemCSS = "@import 'tailwindcss' prefix(foo);";

console.log("Testing the exact CSS from the issue:");
console.log(problemCSS);

try {
    const { parse } = fork(tailwind4);
    const result = parse(problemCSS);
    console.log("SUCCESS: No crash occurred");
    console.log("Result type:", result.type);
} catch (error) {
    console.log("ERROR occurred:");
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);
}

// Test with omit as mentioned in the issue
try {
    // Using the pattern from the issue where they omit 'scope'
    const { omit } = await import('es-toolkit');
    const customSyntax = omit(tailwind4, ['scope']);
    
    const { parse } = fork(customSyntax);
    const result = parse(problemCSS);
    console.log("SUCCESS with omit scope: No crash occurred");
} catch (error) {
    console.log("ERROR with omit scope:");
    console.log("Message:", error.message);
}