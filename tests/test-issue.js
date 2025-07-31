import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject } = fork(tailwind4);

// Test the problematic CSS
const css = `@theme {
  --color-*: initial;

  --color-black: #000;
  --color-white: #fff;
}`;

try {
    const tree = parse(css);
    console.log("Success! Parsed:", JSON.stringify(toPlainObject(tree), null, 2));
} catch (error) {
    console.log("Error:", error.message);
    console.log("Full error:", error);
}