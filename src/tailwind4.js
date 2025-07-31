/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import defaultSyntax from "@eslint/css-tree/definition-syntax-data";
import theme from "./scope/theme.js";
import { themeTypes } from "./types/theme-types.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 * @import { SyntaxConfig } from "@eslint/css-tree"
 */

/** @type {Partial<SyntaxConfig>} */
export const tailwind4 = {
    atrules: {
        apply: {
            prelude: "<ident>+",
        },
        config: {
            prelude: "<string>",
        },
        theme: {
            prelude: null,
            descriptors: defaultSyntax.properties,
        },
        source: {
            prelude: "inline( <string># ) | not inline( <string># )",
        },
        utility: {
            prelude: "<ident>",
        },
        variant: {
            prelude: "<ident>",
            descriptors: defaultSyntax.properties,
        },
        "custom-variant": {
            prelude: "<ident> <parentheses-block>",
        },
        plugin: {
            prelude: "<string>",
        },
        reference: {
            prelude: "<string>",
        },
    },
    types: {
        "length-percentage": `${defaultSyntax.types["length-percentage"]} | <tw-any-spacing>`,
        "color": `${defaultSyntax.types.color} | <tw-any-color>`,
        "tw-alpha": `--alpha(<color> / <percentage>)`,
        "tw-spacing": "--spacing(<number>)",
        "tw-any-spacing": "<tw-spacing> | <tw-theme-spacing>",
        "tw-any-color": "<tw-alpha> | <tw-theme-color>",
        ...themeTypes
    },
    node: {
        TailwindThemeKey
    },
    scope: {
        Value: {
            theme
        }
    }
};
