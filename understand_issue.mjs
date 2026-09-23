import { fork } from "@eslint/css-tree";
import { tailwind4 } from "./src/index.js";

const { parse, toPlainObject } = fork(tailwind4);

console.log("=== Understanding @utility and @variant prelude syntax ===\n");

// The question is: should @utility/@variant prelude accept:
// 1. Only <ident> (current implementation)
// 2. Class selectors like .class-name
// 3. Both?

// Looking at Tailwind 4 docs, @utility and @variant define reusable utilities/variants
// The prelude should be an identifier (the name of the utility/variant)
// CSS-wide keywords like 'unset', 'inherit', 'initial', 'revert' are valid identifiers

console.log("Current implementation: prelude: '<ident>'");
console.log("This means the prelude accepts any identifier token.\n");

// Test with CSS-wide keywords
const cssWideKeywords = ["unset", "inherit", "initial", "revert", "revert-layer"];

cssWideKeywords.forEach(keyword => {
  try {
    const css = `@utility ${keyword} { color: red; }`;
    const tree = parse(css);
    const prelude = toPlainObject(tree).children[0].prelude.children[0];
    console.log(`✓ @utility ${keyword}: type=${prelude.type}, name=${prelude.name || prelude.value}`);
  } catch (e) {
    console.log(`✗ @utility ${keyword}: ${e.message}`);
  }
});

console.log("\n--- Analyzing the potential issue ---\n");
console.log("The ESLint CSS plugin's css/no-invalid-at-rules rule may:");
console.log("1. Expect @utility/@variant prelude to match a specific pattern");
console.log("2. Reject CSS-wide keywords if they're reserved by CSS spec");
console.log("3. Check if the prelude matches the declared syntax '<ident>'");
console.log("\nBUT: <ident> in CSS syntax includes keywords like 'unset'");
console.log("So this should NOT be a bug in the parser itself.");
console.log("\nPossible causes:");
console.log("1. User error: using wrong syntax (e.g., @utility .class-name)");
console.log("2. ESLint rule issue: rule doesn't properly validate custom at-rules");
console.log("3. Syntax definition issue: prelude definition doesn't match spec");
