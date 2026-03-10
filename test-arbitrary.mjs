import { tailwind4 } from "./src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse } = fork(tailwind4);

const testCases = [
  "a { @apply bg-red-500; }",
  "a { @apply grid-cols-[200px_auto]; }",
  "a { @apply bg-[#ff0000]; }",
  "a { @apply w-[200px]; }",
];

testCases.forEach((css) => {
  try {
    const result = parse(css);
    console.log(`✓ PASS: ${css}`);
  } catch (e) {
    console.log(`✗ FAIL: ${css}`);
    console.log(`  Error: ${e.message}`);
  }
});
