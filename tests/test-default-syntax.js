import defaultSyntax from "@eslint/css-tree/definition-syntax-data";

console.log("Properties in defaultSyntax:");
console.log(Object.keys(defaultSyntax.properties).slice(0, 20)); // First 20 keys

// Look for custom property patterns
const customPropKeys = Object.keys(defaultSyntax.properties).filter(key => key.startsWith('--') || key.includes('*'));
console.log("Custom property keys:", customPropKeys);

// Check if there's a generic custom property definition
if (defaultSyntax.properties['--*']) {
    console.log("Generic custom property definition:", defaultSyntax.properties['--*']);
}