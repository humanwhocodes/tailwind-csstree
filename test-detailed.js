import { tailwind4 } from './dist/index.js';
import { fork } from '@eslint/css-tree';

const { parse, toPlainObject } = fork(tailwind4);

console.log("Testing @import with source(none) (like the existing prefix test)...");

try {
  const tree = toPlainObject(parse("@import 'tailwindcss' source(none);"));
  
  console.log("Tree type:", tree.children[0].type);
  console.log("Rule name:", tree.children[0].name);
  console.log("Prelude type:", tree.children[0].prelude.type);
  console.log("Prelude value:", tree.children[0].prelude.value);
  
  // Check if it includes both parts
  console.log("Includes 'tailwindcss':", tree.children[0].prelude.value.includes("'tailwindcss'"));
  console.log("Includes 'source(none)':", tree.children[0].prelude.value.includes("source(none)"));
  
  console.log("✅ SUCCESS: Parsing works correctly");
} catch (error) {
  console.log("❌ ERROR:", error.message);
  console.log("Stack:", error.stack);
}

console.log("\nTesting to see if this causes 'Semicolon or block is expected' error...");

try {
  // Try parsing in different contexts that might be more strict
  const result1 = parse("@import 'tailwindcss' source(none);", { context: 'stylesheet' });
  console.log("✅ Parsing in 'stylesheet' context succeeded");
} catch (error) {
  console.log("❌ Parsing in 'stylesheet' context failed:", error.message);
}

try {
  const result2 = parse("@import 'tailwindcss' source(none);", { context: 'atrule' });
  console.log("✅ Parsing in 'atrule' context succeeded");
} catch (error) {
  console.log("❌ Parsing in 'atrule' context failed:", error.message);
}