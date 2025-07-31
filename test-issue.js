import { tailwind4 } from './dist/index.js';
import { fork } from '@eslint/css-tree';

const { parse, toPlainObject } = fork(tailwind4);

console.log("Testing @import with source(none)...");

try {
  const result = toPlainObject(parse("@import 'tailwindcss' source(none);"));
  console.log("Success! AST:", JSON.stringify(result, null, 2));
} catch (error) {
  console.log("Error:", error.message);
  console.log("Stack:", error.stack);
}