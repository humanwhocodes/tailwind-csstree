import { tailwind4 } from './dist/index.js';
import { fork } from '@eslint/css-tree';

const { parse, toPlainObject, lexer } = fork(tailwind4);

console.log("Testing @import validation with lexer...");

try {
  const ast = parse("@import 'tailwindcss' source(none);");
  console.log("✅ Parsing succeeded");
  
  // Try to validate the @import rule specifically
  const plainObject = toPlainObject(ast);
  const firstRule = plainObject.children[0];
  if (firstRule && firstRule.type === 'Atrule' && firstRule.name === 'import') {
    console.log("Attempting lexer validation...");
    // Convert back to the AST node for lexer validation
    const astRule = ast.children.head.data;
    const result = lexer.matchAtrule(astRule);
    if (result.error) {
      console.log("❌ Lexer validation failed:", result.error.message);
    } else {
      console.log("✅ Lexer validation succeeded");
    }
  }
} catch (error) {
  console.log("❌ Error:", error.message);
  console.log("Stack:", error.stack);
}

console.log("\nTesting if we need explicit @import definition...");

// Let me try to create a minimal @import definition to see if that helps
const customSyntax = {
  ...tailwind4,
  atrules: {
    ...tailwind4.atrules,
    import: {
      prelude: "<string> [ <function> | <ident> ]*",
    }
  }
};

const { parse: customParse, lexer: customLexer } = fork(customSyntax);

try {
  const ast = customParse("@import 'tailwindcss' source(none);");
  console.log("✅ Custom syntax parsing succeeded");
  
  const plainObject = toPlainObject(ast);
  const firstRule = plainObject.children[0];
  if (firstRule && firstRule.type === 'Atrule' && firstRule.name === 'import') {
    const astRule = ast.children.head.data;
    const result = customLexer.matchAtrule(astRule);
    if (result.error) {
      console.log("❌ Custom lexer validation failed:", result.error.message);
    } else {
      console.log("✅ Custom lexer validation succeeded");
    }
  }
} catch (error) {
  console.log("❌ Custom syntax error:", error.message);
}