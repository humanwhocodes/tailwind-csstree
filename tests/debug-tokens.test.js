/**
 * @fileoverview Debug tokenization of slash notation
 */

import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";

describe("Debug tokens", function () {
    it("should show tokenization", () => {
        const { tokenize } = fork(tailwind3);

        console.log("\nTokenizing 'outline-ring/50':");
        const tokens = tokenize("outline-ring/50");
        tokens.forEach((token, index) => {
            console.log(`${index}: ${token.type} = "${token.value}"`);
        });

        console.log("\nTokenizing 'outline-ring 50':");
        const tokens2 = tokenize("outline-ring 50");
        tokens2.forEach((token, index) => {
            console.log(`${index}: ${token.type} = "${token.value}"`);
        });

        console.log("\nTokenizing 'hover:bg-blue-500':");
        const tokens3 = tokenize("hover:bg-blue-500");
        tokens3.forEach((token, index) => {
            console.log(`${index}: ${token.type} = "${token.value}"`);
        });
    });
});