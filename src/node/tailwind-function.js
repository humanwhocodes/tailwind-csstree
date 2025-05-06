/**
 * @fileoverview The TailwindFunction node
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
 * The name of the function node.
 */
export const name = "Function";

/**
 * The walk context for the function node.
 */
export const walkContext = "function";

/**
 * The structure definition for the function node.
 * @type {Object}
 */
export const structure = {
    name: String,
    children: [[]]
};

/**
 * Parses a Tailwind function, handling special cases for 'theme' functions.
 * @type {NodeSyntaxConfig["parse"]}
 */
export function parse(readSequence, recognizer) {
    const start = this.tokenStart;
    const name = this.consumeFunctionName();
    const nameLowerCase = name.toLowerCase();
    let children;
    
    // if (nameLowerCase !== "theme" && nameLowerCase !== "--alpha") {
    //     this.error("TailwindFunction only supports 'theme' and '--alpha' functions.");
    // }
    if (nameLowerCase === "theme") {
        children = this.createList();
        children.push(this.TailwindThemeKey(readSequence, recognizer));
    } else {
        children = recognizer.hasOwnProperty(nameLowerCase)
            ? recognizer[nameLowerCase].call(this, recognizer)
            : readSequence.call(this, recognizer);
    }

    if (!this.eof) {
        this.eat(tokenTypes.RightParenthesis);
    }

    return {
        type: "Function",
        loc: this.getLocation(start, this.tokenStart),
        name,
        children
    };
}

/**
 * Generates the CSS output for a function node.
 * @type {NodeSyntaxConfig["generate"]}
 */
export function generate(node) {
    this.token(tokenTypes.FunctionToken, node.name + '(');
    this.children(node);
    this.token(tokenTypes.RightParenthesis, ')');
}

/**
 * Full TailwindFunction configuration object (for backward compatibility)
 * @type {NodeSyntaxConfig}
 */
export const TailwindFunction = {
    name,
    walkContext,
    structure,
    parse,
    generate
};
