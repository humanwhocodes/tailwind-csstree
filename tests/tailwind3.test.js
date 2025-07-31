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
        
        it("should parse @apply with !important", () => {
            const tree = toPlainObject(parse("a { @apply text-center bg-blue-500 !important; }"));
            
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
                                            loc: null,
                                            name: "a"
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
                                    important: true,
                                    prelude: {
                                        type: "AtrulePrelude",
                                        loc: null,
                                        children: [
                                            {
                                                type: "Identifier",
                                                loc: null,
                                                name: "text-center"
                                            },
                                            {
                                                type: "Identifier",
                                                loc: null,
                                                name: "bg-blue-500"
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
        
        it("should parse @apply with variant and !important", () => {
            const tree = toPlainObject(parse("a { @apply hover:bg-blue-500 focus:ring-blue-500 !important; }"));
            
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
                                            loc: null,
                                            name: "a"
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
                                    important: true,
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
    });
    
    describe("Validation", () => {
        describe("Type Validation", () => {
            [
                "bg-blue-500",
                "hover:bg-blue-700",
                "focus:ring-blue-500",
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
                "bg-blue-500 !important",
                "hover:bg-blue-700 !important",
                "bg-blue-500 focus:ring-blue-500 !important",
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
    
    
    describe("@import", () => {
        it("should parse @import with prefix function without crashing", () => {
            // This is a regression test for the issue where prefix() functions
            // cause parsing to crash. While the prefix function isn't parsed
            // into a structured format, it should not crash and should preserve
            // the original content.
            const tree = toPlainObject(parse("@import 'tailwindcss' prefix(foo);"));
            
            assert.strictEqual(tree.children[0].type, "Atrule");
            assert.strictEqual(tree.children[0].name, "import");
            
            // The prefix function content should be preserved
            assert.ok(tree.children[0].prelude.value.includes("'tailwindcss'"));
            assert.ok(tree.children[0].prelude.value.includes("prefix(foo)"));
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
