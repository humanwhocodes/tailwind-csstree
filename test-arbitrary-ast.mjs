import { tailwind4 } from "./src/tailwind4.js";
import { fork } from "@eslint/css-tree";

const { parse, toPlainObject } = fork(tailwind4);

const testCases = [
  "a { @apply grid-cols-[200px_auto]; }",
  "a { @apply bg-[#ff0000]; }",
];

testCases.forEach((css) => {
  const result = parse(css);
  const plain = toPlainObject(result);
  
  console.log(`\nCSS: ${css}`);
  console.log(JSON.stringify(plain, null, 2));
});
