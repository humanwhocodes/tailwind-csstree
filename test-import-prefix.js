/**
 * Test to reproduce the import prefix issue
 */

import assert from "node:assert";
import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

const { parse } = fork(tailwind4);

// Try to parse the problematic CSS
try {
    const result = parse("@import 'tailwindcss' prefix(foo);");
    console.log("Success: Parsed import with prefix");
    console.log(JSON.stringify(result, null, 2));
} catch (error) {
    console.log("Error parsing import with prefix:");
    console.log(error.message);
    console.log("Error details:", error);
}

// Try some simpler imports to see what works
try {
    const result = parse("@import 'tailwindcss';");
    console.log("Success: Parsed simple import");
} catch (error) {
    console.log("Error parsing simple import:", error.message);
}