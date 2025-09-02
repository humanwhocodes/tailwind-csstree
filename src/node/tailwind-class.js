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

/**
 * @import { CssNode, CssNodeCommon, ParserContext, Recognizer, Identifier } from "@eslint/css-tree";
 * 
 * @typedef {Object} TailwindParserContextApplyExtensions
 * @property {(recognizer: Recognizer) => CssNode} TailwindThemeKey - Parses the key of the theme function.
 * @property {() => CssNode} TailwindUtilityClass - Parses a Tailwind utility class.
 * @property {() => Identifier} Identifier - Parses an identifier.
 * 
 * @typedef {CssNodeCommon & { name: Identifier, variant: Identifier | null }} TailwindUtilityClassNode
 * 
 * @typedef {ParserContext & TailwindParserContextApplyExtensions} TailwindParserApplyContext
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
 * @this {TailwindParserApplyContext} 
 * @type {NodeSyntaxConfig<TailwindUtilityClassNode>["parse"]}
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
    
    // Handle slash notation for opacity (e.g., bg-red-500/50 or hover:bg-red-500/50)
    if (this.tokenType === tokenTypes.Delim && this.tokenValue === '/') {
        this.next(); // consume the '/'
        
        let opacityValue;
        if (this.tokenType === tokenTypes.Ident) {
            opacityValue = this.Identifier();
            // Merge the opacity into the class name
            className = {
                ...className,
                name: className.name + '/' + opacityValue.name
            };
        } else if (this.tokenType === tokenTypes.Number) {
            // For numbers, get the token value and advance
            opacityValue = this.tokenValue;
            this.next(); // consume the number token
            // Merge the opacity into the class name
            className = {
                ...className,
                name: className.name + '/' + opacityValue
            };
        }
        // If neither Ident nor Number, leave the slash unconsumed and let it fail naturally
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
 * @type {NodeSyntaxConfig<TailwindUtilityClassNode>["generate"]}
 */
export function generate(node) {
    
    if (node.variant) {
        // @ts-ignore
        this.token(tokenTypes.Ident, node.variant.name);
        // @ts-ignore
        this.token(tokenTypes.Colon, ':');
    }
    
    // @ts-ignore
    this.token(tokenTypes.Ident, node.name.name);
}
