/**
 * Simple test to see what's being parsed
 */

import { tailwind4 } from "./dist/index.js";
import { fork } from "@eslint/css-tree";

console.log("Tailwind4 config:");
console.log(JSON.stringify(tailwind4.atrules, null, 2));

// Test to see if our at-rule is being recognized
const { parse, toPlainObject } = fork(tailwind4);

const testPrefix = parse("@import 'test' prefix(foo);");
console.log("\nTailwind4 parse of prefix:");
console.log(JSON.stringify(toPlainObject(testPrefix), null, 2));

// Test with default CSS-Tree
const { parse: defaultParse, toPlainObject: defaultToPlainObject } = fork();
const defaultTest = defaultParse("@import 'test' prefix(foo);");
console.log("\nDefault CSS-Tree parse of prefix:");
console.log(JSON.stringify(defaultToPlainObject(defaultTest), null, 2));