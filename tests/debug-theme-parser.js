import { tailwind4 } from "../dist/index.js";
import { fork } from "@eslint/css-tree";

// Check what our syntax extension looks like
console.log("Tailwind4 theme configuration:");
console.log(JSON.stringify(tailwind4.atrules.theme, null, 2));

const { parse, toPlainObject } = fork(tailwind4);

// Test a simple @theme with wildcard
const css = `@theme {
  --color-*: initial;
}`;

try {
    const tree = parse(css);
    console.log("\nParsed tree:");
    console.log(JSON.stringify(toPlainObject(tree), null, 2));
} catch (error) {
    console.log("Parse error:", error.message);
}