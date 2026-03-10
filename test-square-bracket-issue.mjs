import { tailwind4 } from "./src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject, lexer } = fork(tailwind4);

const tests = [
  { css: "a { @apply bg-red-500; }", expected: "PASS" },
  { css: "a { @apply grid-cols-[200px_auto]; }", expected: "FAIL-LEXER" },
  { css: "a { @apply hover:bg-red-500/50; }", expected: "PASS" },
  { css: "a { @apply bg-[#ff0000]; }", expected: "FAIL-LEXER" },
];

console.log("=== TAILWIND4 @APPLY SQUARE BRACKET PARSING TEST ===\n");

tests.forEach(({ css, expected }) => {
  try {
    const result = parse(css);
    const plain = toPlainObject(result);
    const atrule = plain.children[0].block.children[0];
    const prelude = atrule.prelude;
    
    // Try to validate with lexer
    const { error } = lexer.matchAtrulePrelude("apply", prelude);
    
    if (error) {
      console.log(`[${expected === "FAIL-LEXER" ? "✓" : "✗"}] ${css}`);
      console.log(`    Prelude Type: ${prelude.type}`);
      console.log(`    Error: ${error.message.split('\n')[0]}`);
    } else {
      console.log(`[${expected === "PASS" ? "✓" : "✗"}] ${css}`);
      console.log(`    Prelude Type: ${prelude.type}`);
      console.log(`    Children count: ${prelude.children?.length || 'N/A'}`);
    }
  } catch (e) {
    console.log(`[✗] ${css}`);
    console.log(`    Parse Error: ${e.message}`);
  }
  console.log();
});
