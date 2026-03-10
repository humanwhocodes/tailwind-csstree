import { tailwind4 } from "./src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

const testCases = [
  "a { @apply bg-red-500; }",
  "a { @apply grid-cols-[200px_auto]; }",
  "a { @apply bg-[#ff0000]; }",
];

testCases.forEach((css) => {
  try {
    const result = parse(css);
    const plain = toPlainObject(result);
    
    // Check if lexer validates the @apply prelude
    const prelude = plain.children[0].block.children[0].prelude;
    const { error } = lexer.matchAtrulePrelude("apply", prelude);
    
    if (error) {
      console.log(`⚠ PARSE OK but LEXER ERROR: ${css}`);
      console.log(`  Lexer Error: ${error.message}`);
    } else {
      console.log(`✓ PASS: ${css}`);
    }
  } catch (e) {
    console.log(`✗ PARSE FAIL: ${css}`);
    console.log(`  Error: ${e.message}`);
  }
});
