/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "@eslint/css-tree";
import * as TailwindFunction from "./node/tailwind-function.js";
import * as TailwindThemeKey from "./node/tailwind-theme-key.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 * @import { StructureDefinition, SyntaxConfig } from "@eslint/css-tree"
 */


/** @type {SyntaxConfig} */
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
            descriptors: {},
        },
        source: {
            prelude: "<string>",
        },
        utility: {
            prelude: "<ident>",
        },
        variant: {
            prelude: "<ident>",
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
    
    functions: {
        theme: {
            prelude: "<any-value>",
        },
        "--alpha": {
            prelude: "<parentheses-block>",
        },
        "--spacing": {
            prelude: "<parentheses-block>",
        },
    },
    
    node: {
        Function: TailwindFunction,
        TailwindThemeKey
    }
};
