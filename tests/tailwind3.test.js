/**
 * @fileoverview Tests for the Tailwind 3 Syntax.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import assert from "node:assert";
import { tailwind3 } from "../src/tailwind3.js";
import { fork } from "@eslint/css-tree";
import fs from "node:fs/promises";
import { createThemeFunctionTests } from "./helpers/theme-function-tests.js";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const filename = "./tests/fixtures/tailwind3.css";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Tailwind 3", function () {
    
    let parse, toPlainObject, lexer;
    beforeEach(() => {
        ({ parse, toPlainObject, lexer } = fork(tailwind3));
    });
    
    it("tests that tailwind3 is a valid SyntaxExtension", () => {
        parse("a { color: var(-foo); }");
    });
    
    createThemeFunctionTests(fork(tailwind3));
    

    describe("@config", () => {
        it("should parse @config with a string value", () => {
            
            const tree = toPlainObject(parse("@config 'tailwind.config.js';"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "config",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "String",
                                    value: "tailwind.config.js",
                                    loc: null
                                }
                            ]
                        },
                        block: null,
                        loc: null
                    }
                ]
            });
        });
    });
    
    describe("@tailwind", () => {
        it("should parse @tailwind with valid prelude", () => {
            const tree = toPlainObject(parse("@tailwind base;"));
            
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "tailwind",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "base",
                                    loc: null
                                }
                            ]
                        },
                        block: null,
                        loc: null
                    }
                ]
            });
        });
        
        it("should parse @tailwind with multiple values", () => {
            const tree = toPlainObject(parse("@tailwind components utilities;"));
            
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "tailwind",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "components",
                                    loc: null
                                },
                                {
                                    type: "Identifier",
                                    name: "utilities",
                                    loc: null
                                }
                            ]
                        },
                        block: null,
                        loc: null
                    }
                ]
            });
        });
    });
    
    describe("@apply", () => {
        it("should parse @apply with multiple identifiers", () => {
            const tree = toPlainObject(parse("a { @apply text-center bg-blue-500; }"));
            
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Rule",
                        loc: null,
                        prelude: {
                            type: "SelectorList",
                            loc: null,
                            children: [
                                {
                                    type: "Selector",
                                    loc: null,
                                    children: [
                                        {
                                            type: "TypeSelector",
                                            name: "a",
                                            loc: null
                                        }
                                    ]
                                }
                            ]
                        },
                        block: {
                            type: "Block",
                            loc: null,
                            children: [
                                {
                                    type: "Atrule",
                                    name: "apply",
                                    prelude: {
                                        type: "AtrulePrelude",
                                        loc: null,
                                        children: [
                                            {
                                                type: "Identifier",
                                                name: "text-center",
                                                loc: null
                                            },
                                            {
                                                type: "Identifier",
                                                name: "bg-blue-500",
                                                loc: null
                                            }
                                        ]
                                    },
                                    block: null,
                                    loc: null
                                }
                            ]
                        }
                    }
                ]
            });
        });
        
        it("should parse @apply with a variant", () => {
            const tree = toPlainObject(parse("a { @apply hover:bg-blue-500; }"));
            
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Rule",
                        loc: null,
                        prelude: {
                            type: "SelectorList",
                            loc: null,
                            children: [
                                {
                                    type: "Selector",
                                    loc: null,
                                    children: [
                                        {
                                            type: "TypeSelector",
                                            name: "a",
                                            loc: null
                                        }
                                    ]
                                }
                            ]
                        },
                        block: {
                            type: "Block",
                            loc: null,
                            children: [
                                {
                                    type: "Atrule",
                                    name: "apply",
                                    prelude: {
                                        type: "AtrulePrelude",
                                        loc: null,
                                        children: [
                                            {
                                                type: "TailwindUtilityClass",
                                                loc: null,
                                                variant: {
                                                    type: "Identifier",
                                                    name: "hover",
                                                    loc: null
                                                },
                                                name: {
                                                    type: "Identifier",
                                                    name: "bg-blue-500",
                                                    loc: null
                                                },
                                            }
                                        ]
                                    },
                                    block: null,
                                    loc: null
                                }
                            ]
                        }
                    }
                ]
            });
        });
        
        it("should parse @apply with a variant and multiple identifiers", () => {
            const tree = toPlainObject(parse("a { @apply hover:bg-blue-500 focus:ring-blue-500; }"));
            
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Rule",
                        loc: null,
                        prelude: {
                            type: "SelectorList",
                            loc: null,
                            children: [
                                {
                                    type: "Selector",
                                    loc: null,
                                    children: [
                                        {
                                            type: "TypeSelector",
                                            name: "a",
                                            loc: null
                                        }
                                    ]
                                }
                            ]
                        },
                        block: {
                            type: "Block",
                            loc: null,
                            children: [
                                {
                                    type: "Atrule",
                                    name: "apply",
                                    prelude: {
                                        type: "AtrulePrelude",
                                        loc: null,
                                        children: [
                                            {
                                                type: "TailwindUtilityClass",
                                                loc: null,
                                                variant: {
                                                    type: "Identifier",
                                                    name: "hover",
                                                    loc: null
                                                },
                                                name: {
                                                    type: "Identifier",
                                                    name: "bg-blue-500",
                                                    loc: null
                                                },
                                            },
                                            {
                                                type: "TailwindUtilityClass",
                                                loc: null,
                                                variant: {
                                                    type: "Identifier",
                                                    name: "focus",
                                                    loc: null
                                                },
                                                name: {
                                                    type: "Identifier",
                                                    name: "ring-blue-500",
                                                    loc: null
                                                },
                                            }
                                        ]
                                    },
                                    block: null,
                                    loc: null
                                }
                            ]
                        }
                    }
                ]
            });
        });
        
        it("should parse @apply with slash notation for opacity modifiers", () => {
            const testCases = [
                "a { @apply outline-ring/50; }",
                "a { @apply bg-blue-500/30; }",
                "a { @apply border-gray-200/50; }",
            ];
            
            testCases.forEach((testCase) => {
                assert.doesNotThrow(() => {
                    const result = parse(testCase);
                    assert.ok(result, `Should parse: ${testCase}`);
                }, `Should not throw parsing errors for: ${testCase}`);
            });
        });
        
        it("should parse @apply with variants and slash notation", () => {
            const testCases = [
                "a { @apply hover:bg-blue-500/50; }",
                "a { @apply focus:outline-ring/30; }",
                "a { @apply active:border-red-500/25; }",
            ];
            
            testCases.forEach((testCase) => {
                assert.doesNotThrow(() => {
                    const result = parse(testCase);
                    assert.ok(result, `Should parse: ${testCase}`);
                }, `Should not throw parsing errors for: ${testCase}`);
            });
        });
        
        it("should parse the original issue CSS without errors", () => {
            const originalCSS = `
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
            `;
            
            // The original issue was that this would throw:
            // "Parsing error: Semicolon or block is expected"
            // Now it should parse successfully
            assert.doesNotThrow(() => {
                const result = parse(originalCSS);
                assert.ok(result, "Should return a valid AST");
            }, "Should not throw parsing errors");
        });
    });
    
    describe("Validation", () => {
        describe("Type Validation", () => {
            [
                "bg-blue-500",
                "hover:bg-blue-700",
                "focus:ring-blue-500",
                "outline-ring/50",
                "bg-blue-500/30", 
                "border-gray-200/50",
                "hover:bg-blue-500/50",
                "focus:outline-ring/30",
            ].forEach((value) => {
                it(`should validate type <tw-apply-ident> with ${value}`, () => {
                    assert.strictEqual(lexer.matchType("tw-apply-ident", value).error, null);
                });
            });
            
        });
        
        describe("Property Validation", () => {
            
            [
                "bg-blue-500",
                "hover:bg-blue-700",
                "bg-blue-500 focus:ring-blue-500",
                "outline-ring/50",
                "hover:bg-blue-500/50",
                "bg-blue-500/30 focus:outline-ring/50",
            ].forEach((value) => {
                it(`should validate @apply ${value}`, () => {
                    assert.strictEqual(lexer.matchAtrulePrelude("apply", value).error, null);
                });
            });
            
            it(`should validate @container `, () => {
                assert.strictEqual(lexer.matchAtrulePrelude("container", "(min-width: 400px)").error, null);
            });

        });
    });
    
    describe("Canonical Tailwind 3 File", () => {
        it("should parse a canonical Tailwind 3 file", async () => {
            const file = await fs.readFile(filename, "utf8");
            const tree = toPlainObject(parse(file));
            
            assert.strictEqual(tree.type, "StyleSheet");
        });
    });
});
