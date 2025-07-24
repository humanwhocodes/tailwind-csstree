/**
 * Debug the default import prelude
 */

import defaultSyntax from "@eslint/css-tree/definition-syntax-data";

console.log("Default import prelude:");
console.log(defaultSyntax.atrules.import.prelude);

console.log("\nAvailable function types:");
const functionTypes = Object.keys(defaultSyntax.types).filter(k => k.includes('()'));
console.log(functionTypes);