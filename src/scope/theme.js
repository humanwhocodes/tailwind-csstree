/**
 * @fileoverview The theme() function parser for Tailwind CSS.
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
 * @import { CssNode, ParserContext } from "@eslint/css-tree"
 */

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const SLASH = 47; // ASCII code for '/'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * 
 * @param {*} recognizer 
 * @returns {CssNode}
 * @this {ParserContext}
 */
export default function (recognizer) {
    const children = this.createList();
    
    // parse key first
    children.push(this.TailwindThemeKey(recognizer));
    
    
    // the next token could be a / followed by a percentage
    if (this.isDelim(SLASH)) {
        children.push(this.Operator());
        this.skipSC();
        children.push(this.Percentage());
        this.skipSC();
    }
        
    return children;
};
