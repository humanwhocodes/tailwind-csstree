import { fork } from "@eslint/css-tree";

const { parse, toPlainObject } = fork({});

// Test different custom property patterns
const testCases = [
    "--color: red;",
    "--color-red: red;", 
    "--color-*: initial;",
    "--*: initial;"
];

testCases.forEach((css, index) => {
    console.log(`\nTest ${index + 1}: ${css.trim()}`);
    try {
        const fullCSS = `.test { ${css} }`;
        const tree = parse(fullCSS);
        const declaration = tree.children.first.block.children.first;
        console.log("  Type:", declaration.type);
        if (declaration.type === "Declaration") {
            console.log("  Property:", declaration.property);
        } else {
            console.log("  Raw value:", declaration.value);
        }
    } catch (error) {
        console.log("  Error:", error.message);
    }
});