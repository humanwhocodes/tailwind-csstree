/**
 * @fileoverview The TailwindThemeKey node
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "@eslint/css-tree";
import theme from "../scope/theme.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { NodeSyntaxConfig, TokenStream } from "@eslint/css-tree";
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Name of the Tailwind theme key node.
 * @type {string}
 */
export const name = "TailwindThemeKey";

/**
 * Structure of the Tailwind theme key node.
 * @type {NodeSyntaxConfig["structure"]}
 */
export const structure = {
    name: String,
    children: [[]]
};

/**
 * Parse method for Tailwind theme key node.
 * Handles Tailwind functions such as theme(colors.gray.900/75%) and theme(spacing[2.5]).
 * @type {NodeSyntaxConfig["parse"]}
 */
export function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    const children = theme.call(this, readSequence, recognizer);

    return {
        type: name,
        loc: this.getLocation(start, this.tokenStart),
        children
    };
}

/**
 * Generate method for Tailwind theme key node.
 * @type {NodeSyntaxConfig["generate"]}
 */
export function generate(node) {
    this.children(node);
}
