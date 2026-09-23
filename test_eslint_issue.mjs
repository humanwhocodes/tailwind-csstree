import { fork } from "@eslint/css-tree";
import { linter } from "@eslint/css";
import { tailwind4 } from "./src/index.js";
import { defineConfig } from "eslint/config";

const { parse } = fork(tailwind4);

// Test with ESLint CSS plugin
const config = defineConfig([
  {
    files: ["**/*.css"],
    plugins: { css: linter },
    language: "css/css",
    languageOptions: {
      customSyntax: tailwind4,
    },
    rules: {
      "css/no-invalid-at-rules": "error",
    },
  },
]);

// Test case 1: normal utility name
console.log("\nTest 1: @utility font-mono { color: red; }");
try {
  const tree1 = parse("@utility font-mono { color: red; }");
  console.log("✓ Parsing successful");
} catch (e) {
  console.log("✗ Parsing failed:", e.message);
}

// Test case 2: utility with CSS-wide keyword (unset)
console.log("\nTest 2: @utility unset { color: red; }");
try {
  const tree2 = parse("@utility unset { color: red; }");
  console.log("✓ Parsing successful");
} catch (e) {
  console.log("✗ Parsing failed:", e.message);
}

// Test case 3: variant with CSS-wide keyword
console.log("\nTest 3: @variant inherit { .class { color: red; } }");
try {
  const tree3 = parse("@variant inherit { .class { color: red; } }");
  console.log("✓ Parsing successful");
} catch (e) {
  console.log("✗ Parsing failed:", e.message);
}
