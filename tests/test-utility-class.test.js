/**
 * @fileoverview Test the TailwindUtilityClass parser in isolation
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Test TailwindUtilityClass parser", function () {
    it("should test variant parsing", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test that existing variant parsing works
        const variantCase = "a { @apply hover:bg-blue-500; }";
        const result1 = parse(variantCase);
        const plain1 = toPlainObject(result1);
        
        console.log("Variant parsing result:");
        console.log("Prelude type:", plain1.children[0].block.children[0].prelude.type);
        
        if (plain1.children[0].block.children[0].prelude.type === "AtrulePrelude") {
            const children = plain1.children[0].block.children[0].prelude.children;
            console.log("Children:", children.map(child => ({
                type: child.type,
                name: child.name?.name || child.name || 'N/A',
                variant: child.variant?.name || 'N/A'
            })));
        }
    });
    
    it("should test simple identifier parsing", () => {
        const { parse, toPlainObject } = fork(tailwind3);
        
        // Test that simple identifier parsing works
        const simpleCase = "a { @apply bg-blue-500; }";
        const result2 = parse(simpleCase);
        const plain2 = toPlainObject(result2);
        
        console.log("Simple parsing result:");
        console.log("Prelude type:", plain2.children[0].block.children[0].prelude.type);
        
        if (plain2.children[0].block.children[0].prelude.type === "AtrulePrelude") {
            const children = plain2.children[0].block.children[0].prelude.children;
            console.log("Children:", children.map(child => ({
                type: child.type,
                name: child.name || 'N/A'
            })));
        }
    });
});