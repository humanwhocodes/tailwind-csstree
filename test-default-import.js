/**
 * Test to check default CSS parsing of import
 */

import { fork } from "@eslint/css-tree";

// Test with default CSSTree syntax
const { parse, toPlainObject } = fork({});

try {
    const result = toPlainObject(parse("@import 'tailwindcss' prefix(foo);"));
    console.log("Default CSSTree parsing:");
    console.log(JSON.stringify(result, null, 2));
} catch (error) {
    console.log("Error with default CSSTree:", error.message);
}

// Test simple import
try {
    const result = toPlainObject(parse("@import 'tailwindcss';"));
    console.log("\nSimple import with default CSSTree:");
    console.log(JSON.stringify(result, null, 2));
} catch (error) {
    console.log("Error with simple import:", error.message);
}