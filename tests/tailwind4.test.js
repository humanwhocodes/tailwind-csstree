/**
 * @fileoverview Tests for the Tailwind 4 Syntax.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import assert from "node:assert";
import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";
import fs from "node:fs/promises";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const filename = "./tests/fixtures/tailwind4.css";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("Tailwind 4", function () {
    
    let parse, toPlainObject, lexer;
    beforeEach(() => {
        ({ parse, toPlainObject, lexer } = fork(tailwind4));
    });

    it("tests that tailwind4 is a valid SyntaxExtension", () => {
        parse("a { color: var(--foo); }");
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

    describe("@plugin", () => {
        it("should parse @plugin with a string value", () => {
            const tree = toPlainObject(parse("@plugin 'tailwindcss/typography';"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "plugin",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "String",
                                    value: "tailwindcss/typography",
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

    describe("theme()", () => {
        it("should parse theme() with colors.green.500", () => {
            const tree = toPlainObject(parse("a { color: theme(colors.green.500); }"));
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
                                                                name: "green",
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
    });

    describe("@theme", () => {
        it("should parse @theme with a valid prelude", () => {
            const tree = toPlainObject(parse("@theme colors { primary: #ff0000; }"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "theme",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "colors",
                                    loc: null
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
                                    property: "primary",
                                    value: {
                                        type: "Value",
                                        children: [
                                            {
                                                type: "Hash",
                                                value: "ff0000",
                                                loc: null
                                            }
                                        ],
                                        loc: null
                                    },
                                    important: false
                                }
                            ]
                        },
                        loc: null
                    }
                ]
            });
        });
    });

    describe("@source", () => {
        it("should parse @source with a valid URL", () => {
            const tree = toPlainObject(parse("@source url('https://example.com/styles.css');"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "source",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Url",
                                    value: "https://example.com/styles.css",
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

    describe("@variant", () => {
        it("should parse @variant with a valid prelude", () => {
            const tree = toPlainObject(parse("@variant hover { .example { color: blue; } }"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "variant",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "hover",
                                    loc: null
                                }
                            ]
                        },
                        block: {
                            type: "Block",
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
                                                        type: "ClassSelector",
                                                        name: "example",
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
                                                            type: "Identifier",
                                                            name: "blue",
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
                        },
                        loc: null
                    }
                ]
            });
        });
    });

    describe("@custom-variant", () => {
        it("should parse @custom-variant with a valid prelude", () => {
            const tree = toPlainObject(parse("@custom-variant my-variant { .example { color: green; } }"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "custom-variant",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "my-variant",
                                    loc: null
                                }
                            ]
                        },
                        block: {
                            type: "Block",
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
                                                        type: "ClassSelector",
                                                        name: "example",
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
                                                            type: "Identifier",
                                                            name: "green",
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
                        },
                        loc: null
                    }
                ]
            });
        });
    });

    describe("@apply", () => {
        it("should parse @apply with valid classes", () => {
            const tree = toPlainObject(parse(".example { @apply bg-red-500 text-white; }"));
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
                                            type: "ClassSelector",
                                            name: "example",
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
                                                name: "bg-red-500",
                                                loc: null
                                            },
                                            {
                                                type: "Identifier",
                                                name: "text-white",
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

    describe("@reference", () => {
        it("should parse @reference with a valid prelude", () => {
            const tree = toPlainObject(parse("@reference colors { primary: #00ff00; }"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "reference",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "Identifier",
                                    name: "colors",
                                    loc: null
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
                                    property: "primary",
                                    value: {
                                        type: "Value",
                                        children: [
                                            {
                                                type: "Hash",
                                                value: "00ff00",
                                                loc: null
                                            }
                                        ],
                                        loc: null
                                    },
                                    important: false
                                }
                            ]
                        },
                        loc: null
                    }
                ]
            });
        });
    });
    
    describe.only("Validation", () => {
        it("should validate margin: --spacing(4)", () => {
            const tree = toPlainObject(parse("a { margin: --spacing(4); }"));
            const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
            assert.strictEqual(error, null);
        });
        
        it("should validate margin: theme(spacing.4)", () => {
            const tree = toPlainObject(parse("a { margin: theme(spacing.4); }"));
            const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
            assert.strictEqual(error, null);
        });
        
        it("should validate color: --alpha(#000 / 50%)", () => {
            const tree = toPlainObject(parse("a { color: --alpha(#000 / 50%); }"));
            const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
            assert.strictEqual(error, null);
        });
    });

    describe("Canonical Tailwind 4 File", () => {
        it("should parse a canonical Tailwind 4 file", async () => {
            const file = await fs.readFile(filename, "utf8");
            const tree = toPlainObject(parse(file));
            
            assert.strictEqual(tree.type, "StyleSheet");
        });
    });
});
