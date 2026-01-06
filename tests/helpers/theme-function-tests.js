/**
 * @fileoverview Tests for the Tailwind 4 Syntax.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import assert from "node:assert";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

export function createThemeFunctionTests({ parse, toPlainObject, lexer }) {
    
    describe("theme() function", () => {
        describe("Parsing", () => {
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

            it("should parse theme() with colors.red.500 / 50%", () => {
                const tree = toPlainObject(parse("a { color: theme(colors.red.500 / 50%); }"));
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
                                                        },
                                                        {
                                                            type: "Operator",
                                                            value: "/",
                                                            loc: null
                                                        },
                                                        {
                                                            type: "Percentage",
                                                            value: "50",
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
                                                            ],
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

        describe("Validation", () => {
            describe("Type Validation", () => {

                [
                    "theme(spacing.12)",
                    "theme(spacing.4)",
                ].forEach((value) => {
                    it(`should validate type <tw-theme-spacing> with ${value}`, () => {
                        const tree = parse(value, { context: 'value' });
                        assert.strictEqual(lexer.matchType("tw-theme-spacing", tree).error, null);
                    });
                });

                [
                    "theme(colors.gray.900)",
                    "theme(colors.red.500 / 50%)",
                    "theme(colors.green.225)",
                ].forEach((value) => {
                    it(`should validate type <tw-theme-color> with ${value}`, () => {
                        const tree = parse(value, { context: 'value' });
                        assert.strictEqual(lexer.matchType("tw-theme-color", tree).error, null);
                    });
                });

            });

            describe("Property Validation", () => {

                it("should validate margin: theme(spacing.4)", () => {
                    const tree = toPlainObject(parse("a { margin: theme(spacing.4); }"));
                    const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
                    assert.strictEqual(error, null);
                });

                it("should validate color: theme(colors.red.500 / 50%)", () => {
                    const tree = toPlainObject(parse("a { color: theme(colors.red.500 / 50%); }"));
                    const { error } = lexer.matchDeclaration(tree.children[0].block.children[0]);
                    assert.strictEqual(error, null);
                });

            });
        });

    });
}
