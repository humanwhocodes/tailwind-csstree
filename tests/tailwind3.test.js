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

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const filename = "./tests/fixtures/tailwind3.css";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Tailwind 3", function () {
    
    let parse, toPlainObject;
    beforeEach(() => {
        ({ parse, toPlainObject } = fork(tailwind3));
    });
    
    it("tests that tailwind3 is a valid SyntaxExtension", () => {
        parse("a { color: var(-foo); }");
    });

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
    });
    
    describe("theme()", () => {
        
        it("should parse theme() with colors.red.500", () => {
            const tree = toPlainObject(parse("a { color: theme(colors.red.500); }"));
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
                                    type: "Declaration",
                                    loc: null,
                                    property: "color",
                                    value: {
                                        type: "Value",
                                        children: [
                                            {
                                                type: "Function",
                                                name: "theme",
                                                children: [
                                                    {
                                                        type: "TailwindThemeKey",
                                                        children: [
                                                            {
                                                                type: "Identifier",
                                                                name: "colors",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Operator",
                                                                value: ".",
                                                                loc: null,
                                                            },
                                                            {
                                                                type: "Identifier",
                                                                name: "red",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Operator",
                                                                value: ".",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Number",
                                                                value: "500",
                                                                loc: null
                                                            }
                                                        ],
                                                        loc: null
                                                    }
                                                ],
                                                loc: null
                                            }
                                        ],
                                        loc: null
                                    },
                                    important: false
                                }
                            ]
                        }
                    }
                ]
            });
        });
        
        it("should parse theme() with colors.gray.900/75%", () => {
            const tree = toPlainObject(parse("a { color: theme(colors.gray.900/75%); }"));
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
                                    type: "Declaration",
                                    loc: null,
                                    property: "color",
                                    value: {
                                        type: "Value",
                                        children: [
                                            {
                                                type: "Function",
                                                name: "theme",
                                                children: [
                                                    {
                                                        type: "TailwindThemeKey",
                                                        children: [
                                                            {
                                                                type: "Identifier",
                                                                name: "colors",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Operator",
                                                                value: ".",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Identifier",
                                                                name: "gray",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Operator",
                                                                value: ".",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Number",
                                                                value: "900",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Operator",
                                                                value: "/",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Percentage",
                                                                value: "75",
                                                                loc: null
                                                            }
                                                        ],
                                                        loc: null
                                                    }
                                                ],
                                                loc: null
                                            }
                                        ],
                                        loc: null
                                    },
                                    important: false
                                }
                            ]
                        }
                    }
                ]
            });
        });
        
        it("should parse theme() with spacing[2.5]", () => {
            const tree = toPlainObject(parse("a { margin: theme(spacing[2.5]); }"));
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
                                    type: "Declaration",
                                    loc: null,
                                    property: "margin",
                                    value: {
                                        type: "Value",
                                        children: [
                                            {
                                                type: "Function",
                                                name: "theme",
                                                children: [
                                                    {
                                                        type: "TailwindThemeKey",
                                                        children: [
                                                            {
                                                                type: "Identifier",
                                                                name: "spacing",
                                                                loc: null
                                                            },
                                                            {
                                                                type: "Brackets",
                                                                loc: null,
                                                                children: [
                                                                    {
                                                                        type: "Number",
                                                                        value: "2.5",
                                                                        loc: null
                                                                    },
                                                                ]
                                                            }
                                                        ],
                                                        loc: null
                                                    }
                                                ],
                                                loc: null
                                            }
                                        ],
                                        loc: null
                                    },
                                    important: false
                                }
                            ]
                        }
                    }
                ]
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
