import { fork } from '@eslint/css-tree';

// Test with default CSS parser
const { parse: defaultParse, toPlainObject: defaultToPlainObject } = fork();

console.log("Testing @import with source(none) using default CSS parser...");

try {
  const result = defaultToPlainObject(defaultParse("@import 'tailwindcss' source(none);"));
  console.log("Default parser result:", JSON.stringify(result, null, 2));
} catch (error) {
  console.log("Default parser error:", error.message);
}

// Test with @eslint/css
import * as eslintCSS from '@eslint/css';

console.log("\nTesting @import with source(none) using @eslint/css...");

try {
  const result = eslintCSS.parseCSS("@import 'tailwindcss' source(none);");
  console.log("@eslint/css parser result:", JSON.stringify(result, null, 2));
} catch (error) {
  console.log("@eslint/css parser error:", error.message);
  console.log("Stack:", error.stack);
}