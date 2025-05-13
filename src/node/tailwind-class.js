/**
 * @fileoverview The TailwindUtilityClass node.
 * Represents a Tailwind utility class in the AST, such as "bg-red-500"
 * or "hover:bg-blue-700".
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "@eslint/css-tree";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { NodeSyntaxConfig } from "@eslint/css-tree";
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Name of the Tailwind utility class node.
 * @type {string}
 */
export const name = "TailwindUtilityClass";

/**
 * Structure of the Tailwind theme key node.
 * @type {NodeSyntaxConfig["structure"]}
 */
export const structure = {
    name: ["Identifier"],
    variant: ["Identifier"],
};

/**
 * Parse method for Tailwind theme key node.
 * Handles Tailwind functions such as theme(colors.gray.900/75%) and theme(spacing[2.5]).
 * @type {NodeSyntaxConfig["parse"]}
 */
export function parse() {
    this.skipSC();
    const start = this.tokenStart;
    let className = this.Identifier();
    
    // if next character is a :, then it's a variant
    let variant = null;
    if (this.tokenType === tokenTypes.Colon) {
        this.next();
        variant = className;
        className = this.Identifier();
    }

    this.skipSC();
    
    return {
        type: name,
        loc: this.getLocation(start, this.tokenStart),
        name: className,
        variant
    };
}

/**
 * Generate method for Tailwind theme key node.
 * @type {NodeSyntaxConfig["generate"]}
 */
export function generate(node) {
    this.children(node);
}
