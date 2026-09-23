import { fork } from "@eslint/css-tree";
import { tailwind4 } from "./src/index.js";

const { parse, toPlainObject } = fork(tailwind4);

// Test 1: normal utility name
try {
  const tree1 = parse("@utility font-mono { color: red; }");
  console.log("✓ Test 1 (normal utility): PASS");
  console.log("  ", toPlainObject(tree1).children[0].prelude.children[0]);
} catch (e) {
  console.log("✗ Test 1 (normal utility): FAIL");
  console.log("  ", e.message);
}

// Test 2: utility with CSS-wide keyword (unset)
try {
  const tree2 = parse("@utility unset { color: red; }");
  console.log("✓ Test 2 (CSS-wide keyword 'unset'): PASS");
  console.log("  ", toPlainObject(tree2).children[0].prelude.children[0]);
} catch (e) {
  console.log("✗ Test 2 (CSS-wide keyword 'unset'): FAIL");
  console.log("  ", e.message);
}

// Test 3: utility with selector like .class
try {
  const tree3 = parse("@utility .class { color: red; }");
  console.log("✓ Test 3 (class selector): PASS");
  console.log("  ", toPlainObject(tree3).children[0].prelude);
} catch (e) {
  console.log("✗ Test 3 (class selector): FAIL");
  console.log("  ", e.message);
}

// Test 4: variant with CSS-wide keyword
try {
  const tree4 = parse("@variant unset { .class { color: red; } }");
  console.log("✓ Test 4 (variant with CSS-wide keyword): PASS");
  console.log("  ", toPlainObject(tree4).children[0].prelude.children[0]);
} catch (e) {
  console.log("✗ Test 4 (variant with CSS-wide keyword): FAIL");
  console.log("  ", e.message);
}
