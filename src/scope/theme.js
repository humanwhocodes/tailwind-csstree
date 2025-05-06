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


//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const DOT = 46; // ASCII code for '.'
const SLASH = 47; // ASCII code for '/'

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

// theme( <ident>.<ident> , <value>? )
export default function (readSequence, recognizer) {
    const children = this.createList();

    this.skipSC();

    children.push(this.Identifier());

    outer:
    while (this.isDelim(DOT)) {
        children.push(this.Operator());
        
        // can be an identifier, a square bracket, or a number
        switch (this.tokenType) {
            case tokenTypes.Ident:
                children.push(this.Identifier());
                break;
            
            default:
                this.error("Expected identifier, square bracket, or number after '.' in theme function.");
        }
    }
    
    if (this.tokenType === tokenTypes.LeftSquareBracket) {
        children.push(this.Brackets(readSequence, recognizer));
    }

    
    /*
     * A bit weird here. CSS tokenization allows a number to begin with a dot,
     * so something like colors.gray.900 means that .900 is considered a number.
     * To account for that, we check if there is a number, and if so, if the first
     * character is a dot. If it is, we treat it as an operator.
     */
    if (this.tokenType === tokenTypes.Number) {
        // number can begin with a dot, so we need to check if the character is a dot
        if (this.source.charCodeAt(this.tokenStart) === DOT) {
            children.push({
                type: "Operator",
                loc: this.getLocation(this.tokenStart, this.tokenStart + 1),
                value: this.substrToCursor(this.tokenStart++)
            });
        }
        children.push(this.Number());
    }


    this.skipSC();

    // the next token could be a / followed by a percentage
    if (this.isDelim(SLASH)) {
        children.push(this.Operator());
        this.skipSC();
        children.push(this.Percentage());
        this.skipSC();
    }
    
    
    return children;
};
