/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import defaultSyntax from "@eslint/css-tree/definition-syntax-data";
import tailwindImport from "./atrule/tailwind-import.js";
import theme from "./scope/theme.js";
import { themeTypes } from "./types/theme-types.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { SyntaxConfig } from "@eslint/css-tree"
 */

/** @type {Partial<SyntaxConfig>} */
export const tailwind4 = {
    atrule: {
        import: tailwindImport,
    },
    atrules: {
        import: {
            prelude: "[ <string> | <url> ] [ [ source( [ <string> | none ] ) ]? || [ prefix( <ident> ) ]? || [ layer | layer( <layer-name> ) ]? ] [ supports( [ <supports-condition> | <declaration> ] ) ]? <media-query-list>?",
        },
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
            prelude: "<string>",
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
