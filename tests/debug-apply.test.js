/**
 * @fileoverview Debug test to understand how existing @apply parsing works
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug @apply parsing", function () {
    it("should show how existing @apply works", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test existing working case
        const workingCase = `a { @apply text-center bg-blue-500; }`;
        console.log("Testing existing working case:", workingCase);
        
        const result = parse(workingCase);
        console.log("Working result:", JSON.stringify(toPlainObject(result), null, 2));
    });
    
    it("should show how variant parsing works", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test variant case
        const variantCase = `a { @apply hover:bg-blue-500; }`;
        console.log("Testing variant case:", variantCase);
        
        const result = parse(variantCase);
        console.log("Variant result:", JSON.stringify(toPlainObject(result), null, 2));
    });
});