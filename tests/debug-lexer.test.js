/**
 * @fileoverview Test lexer validation directly
 */

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug lexer validation", function () {
    it("should test lexer validation", () => {
        const { lexer } = fork(tailwind3);

        console.log("=== Testing lexer validation ===");
        
        const test1 = lexer.matchType('tw-apply-ident', 'bg-blue-500');
        console.log("bg-blue-500:", test1.error === null ? "VALID" : "INVALID");
        
        const test2 = lexer.matchType('tw-apply-ident', 'bg-blue-500/50');  
        console.log("bg-blue-500/50:", test2.error === null ? "VALID" : "INVALID");
        
        const test3 = lexer.matchType('tw-apply-ident', 'hover:bg-blue-500');
        console.log("hover:bg-blue-500:", test3.error === null ? "VALID" : "INVALID");
        
        const test4 = lexer.matchType('tw-apply-ident', 'hover:bg-blue-500/50');
        console.log("hover:bg-blue-500/50:", test4.error === null ? "VALID" : "INVALID");
        
        console.log("\n=== Testing @apply prelude validation ===");
        
        const apply1 = lexer.matchAtrulePrelude('apply', 'bg-blue-500');
        console.log("@apply bg-blue-500:", apply1.error === null ? "VALID" : "INVALID");
        
        const apply2 = lexer.matchAtrulePrelude('apply', 'bg-blue-500/50');
        console.log("@apply bg-blue-500/50:", apply2.error === null ? "VALID" : "INVALID");
        
        const apply3 = lexer.matchAtrulePrelude('apply', 'hover:bg-blue-500');
        console.log("@apply hover:bg-blue-500:", apply3.error === null ? "VALID" : "INVALID");
        
        const apply4 = lexer.matchAtrulePrelude('apply', 'hover:bg-blue-500/50');
        console.log("@apply hover:bg-blue-500/50:", apply4.error === null ? "VALID" : "INVALID");
    });
});