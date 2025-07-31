import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

// Test the problematic CSS
const css = `@theme {
  --color-*: initial;
}`;

try {
    const tree = parse(css);
    console.log("Parsed successfully");
    
    // Check if the declaration can be validated
    const declaration = tree.children.first.block.children.first;
    console.log("Declaration type:", declaration.type);
    console.log("Declaration:", declaration);
    
    if (declaration.type === "Declaration") {
        const result = lexer.matchDeclaration(declaration);
        console.log("Validation result:", result.error ? result.error.message : "Valid");
    } else {
        console.log("Not parsed as a Declaration - this is the issue!");
    }
    
} catch (error) {
    console.log("Parse error:", error.message);
    console.log("Line/column:", error.line, error.column);
}