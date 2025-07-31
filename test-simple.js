import { CSSLanguage } from '@eslint/css';

console.log("Testing @import with source(none) using @eslint/css...");

try {
  const sourceCode = new CSSLanguage().parse("@import 'tailwindcss' source(none);");
  console.log("@eslint/css parser succeeded");
  // Can't easily inspect the result as it's likely not JSON serializable
} catch (error) {
  console.log("@eslint/css parser error:", error.message);
  console.log("Stack:", error.stack);
}

console.log("\nTesting basic @import...");
try {
  const basicResult = new CSSLanguage().parse("@import 'tailwindcss';");
  console.log("Basic @import succeeded");
} catch (error) {
  console.log("Basic @import error:", error.message);
}