/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import * as TailwindFunction from "./node/tailwind-function.js";
import * as TailwindThemeKey from "./node/tailwind-theme-key.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/css-tree").SyntaxExtension} SyntaxExtension
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 */


/** @type {SyntaxExtension} */
export const tailwind3 = {
    atrules: {

        apply: {
            prelude: "<ident>+",
        },
        tailwind: {
            prelude: "base | components | utilities",
        },
        config: {
            prelude: "<string>",
        },
    },
    node: {
        Function: TailwindFunction,
        TailwindThemeKey
    }
};
