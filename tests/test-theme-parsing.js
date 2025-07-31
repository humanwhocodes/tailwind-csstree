import { tailwind4 } from "../dist/index.js";
import { fork } from "@eslint/css-tree";

console.log("Testing theme parser...");

// Check if our parser has the expected structure
console.log("Theme parser has block function:", typeof tailwind4.atrules.theme.parse.block === 'function');

const { parse, toPlainObject } = fork(tailwind4);

// Test different scenarios
const testCases = [
    { 
        name: "Normal custom property in @theme", 
        css: "@theme { --color: red; }" 
    },
    { 
        name: "Wildcard custom property in @theme", 
        css: "@theme { --color-*: initial; }" 
    },
    { 
        name: "Multiple properties in @theme",
        css: "@theme { --color-*: initial; --color-red: #ff0000; }"
    }
];

testCases.forEach((testCase, i) => {
    console.log(`\n=== ${testCase.name} ===`);
    try {
        const tree = parse(testCase.css);
        const block = tree.children.first.block;
        
        console.log(`Block children count: ${block.children.size}`);
        
        block.children.forEach((child, index) => {
            console.log(`Child ${index + 1}:`);
            console.log(`  Type: ${child.type}`);
            if (child.type === "Declaration") {
                console.log(`  Property: ${child.property}`);
                console.log(`  ✅ Successfully parsed as Declaration`);
            } else {
                console.log(`  Raw value: ${child.value}`);
                console.log(`  ❌ Parsed as Raw`);
            }
        });
        
    } catch (error) {
        console.log(`❌ Parse error: ${error.message}`);
    }
});