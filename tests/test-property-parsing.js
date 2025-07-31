import { fork } from "@eslint/css-tree";

// Test how CSSTree handles different property parsing scenarios
const tests = [
    // Test 1: Basic custom property in regular rule
    { css: ".test { --color: red; }", desc: "Basic custom property" },
    
    // Test 2: Wildcard custom property in regular rule
    { css: ".test { --color-*: red; }", desc: "Wildcard custom property in rule" },
    
    // Test 3: Regular @theme with basic custom property
    { css: "@theme { --color: red; }", desc: "Basic custom property in @theme" },
    
    // Test 4: @theme with wildcard (the problematic case)
    { css: "@theme { --color-*: initial; }", desc: "Wildcard custom property in @theme" }
];

tests.forEach((test, i) => {
    console.log(`\n=== Test ${i + 1}: ${test.desc} ===`);
    console.log(`CSS: ${test.css}`);
    
    try {
        const { parse, toPlainObject } = fork({});
        const tree = parse(test.css);
        const result = toPlainObject(tree);
        
        // Find the declaration/raw node
        let declaration;
        if (result.children[0].type === "Rule") {
            declaration = result.children[0].block.children[0];
        } else if (result.children[0].type === "Atrule") {
            declaration = result.children[0].block?.children[0];
        }
        
        if (declaration) {
            console.log(`Result type: ${declaration.type}`);
            if (declaration.type === "Declaration") {
                console.log(`Property: ${declaration.property}`);
                console.log(`✅ Successfully parsed as Declaration`);
            } else {
                console.log(`Raw value: ${declaration.value}`);
                console.log(`❌ Parsed as Raw (not Declaration)`);
            }
        } else {
            console.log("❓ No declaration found");
        }
        
    } catch (error) {
        console.log(`❌ Parse error: ${error.message}`);
    }
});