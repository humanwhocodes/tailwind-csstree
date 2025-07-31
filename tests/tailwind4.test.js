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
import { createThemeFunctionTests } from "./helpers/theme-function-tests.js";

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
    
    createThemeFunctionTests(fork(tailwind4));

    describe("@import", () => {
        it("should parse @import with a string value", () => {
            const tree = toPlainObject(parse("@import 'tailwindcss';"));
            assert.deepStrictEqual(tree, {
                type: "StyleSheet",
                loc: null,
                children: [
                    {
                        type: "Atrule",
                        name: "import",
                        prelude: {
                            type: "AtrulePrelude",
                            loc: null,
                            children: [
                                {
                                    type: "String",
                                    value: "tailwindcss",
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
    
    describe("Validation", () => {
        describe("Type Validation", () => {
            [
                "--alpha(#000 / 50%)",
                "--alpha(white / 70%)",
                "--alpha(rgba(0, 0, 0, 0.5) / 1%)",
            ].forEach((value) => {
                it(`should validate type <tw-alpha> with ${value}`, () => {
                    const tree = parse(value, { context: 'value' });
                    assert.strictEqual(lexer.matchType("tw-alpha", tree).error, null);
                });

                it(`should validate type <tw-any-color> with ${value}`, () => {
                    const tree = parse(value, { context: 'value' });
                    assert.strictEqual(lexer.matchType("tw-any-color", tree).error, null);
                });
            });
            
            [
                "--spacing(4)",
                "--spacing(12)",
                "--spacing(0.5)",
            ].forEach((value) => {
                it(`should validate type <tw-spacing> with ${value}`, () => {
                    const tree = parse(value, { context: 'value' });
                    assert.strictEqual(lexer.matchType("tw-spacing", tree).error, null);
                });

                it(`should validate type <tw-any-spacing> with ${value}`, () => {
                    const tree = parse(value, { context: 'value' });
                    assert.strictEqual(lexer.matchType("tw-any-spacing", tree).error, null);
                });
            });
        });
        
        describe("Property Validation", () => {
            
            it("should validate margin: --spacing(4)", () => {
                const tree = toPlainObject(parse("a { margin: --spacing(4); }"));
                const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
                assert.strictEqual(error, null);
            });
            
            it("should validate color: --alpha(#000 / 50%)", () => {
                const tree = toPlainObject(parse("a { color: --alpha(#000 / 50%); }"));
                const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
                assert.strictEqual(error, null);
            });
            
        });
    });

    describe("@media with screen() function", () => {
        it("should parse @media screen(sm) with a simple rule", () => {
            const tree = toPlainObject(parse("@media screen(sm) { .sidebar { display: none; } }"));
            
            assert.strictEqual(tree.type, "StyleSheet");
            assert.strictEqual(tree.children[0].type, "Atrule");
            assert.strictEqual(tree.children[0].name, "media");
            
            // Check the screen() function is parsed correctly
            const condition = tree.children[0].prelude.children[0].children[0].condition;
            const generalEnclosed = condition.children[0];
            assert.strictEqual(generalEnclosed.type, "GeneralEnclosed");
            assert.strictEqual(generalEnclosed.function, "screen");
            assert.strictEqual(generalEnclosed.children[0].type, "Identifier");
            assert.strictEqual(generalEnclosed.children[0].name, "sm");
        });

        it("should parse @media screen(md) with theme() function", () => {
            const tree = toPlainObject(parse("@media screen(md) { .container { max-width: theme(screens.md); } }"));
            
            assert.strictEqual(tree.type, "StyleSheet");
            assert.strictEqual(tree.children[0].type, "Atrule");
            assert.strictEqual(tree.children[0].name, "media");
            
            // Check the screen() function
            const condition = tree.children[0].prelude.children[0].children[0].condition;
            const generalEnclosed = condition.children[0];
            assert.strictEqual(generalEnclosed.type, "GeneralEnclosed");
            assert.strictEqual(generalEnclosed.function, "screen");
            assert.strictEqual(generalEnclosed.children[0].name, "md");
            
            // Check the theme(screens.md) function
            const declaration = tree.children[0].block.children[0].block.children[0];
            const themeFunction = declaration.value.children[0];
            assert.strictEqual(themeFunction.type, "Function");
            assert.strictEqual(themeFunction.name, "theme");
            assert.strictEqual(themeFunction.children[0].type, "TailwindThemeKey");
        });

        it("should parse @media screen() with different breakpoint names", () => {
            const testCases = [
                { breakpoint: "xs", expectedType: "Identifier", expectedValue: "xs" },
                { breakpoint: "sm", expectedType: "Identifier", expectedValue: "sm" },
                { breakpoint: "md", expectedType: "Identifier", expectedValue: "md" },
                { breakpoint: "lg", expectedType: "Identifier", expectedValue: "lg" },
                { breakpoint: "xl", expectedType: "Identifier", expectedValue: "xl" },
                { breakpoint: "2xl", expectedType: "Dimension", expectedValue: "2", expectedUnit: "xl" }
            ];
            
            testCases.forEach(({ breakpoint, expectedType, expectedValue, expectedUnit }) => {
                const css = `@media screen(${breakpoint}) { .test { display: block; } }`;
                const tree = toPlainObject(parse(css));
                
                const generalEnclosed = tree.children[0].prelude.children[0].children[0].condition.children[0];
                assert.strictEqual(generalEnclosed.function, "screen");
                
                const child = generalEnclosed.children[0];
                assert.strictEqual(child.type, expectedType);
                
                if (expectedType === "Identifier") {
                    assert.strictEqual(child.name, expectedValue);
                } else if (expectedType === "Dimension") {
                    assert.strictEqual(child.value, expectedValue);
                    assert.strictEqual(child.unit, expectedUnit);
                }
            });
        });

        it("should validate @media screen() with lexer", () => {
            const mediaQueries = [
                "screen(sm)",
                "screen(md)",
                "screen(lg)",
                "screen(xl)"
            ];
            
            mediaQueries.forEach(query => {
                const { error } = lexer.matchAtrulePrelude("media", query);
                assert.strictEqual(error, null, `Failed to validate @media ${query}`);
            });
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
