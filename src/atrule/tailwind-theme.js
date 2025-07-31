/**
 * @fileoverview Tailwind 4 @theme rule parser
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
 * @import { ParserContext, ConsumerFunction } from "@eslint/css-tree";
 * 
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export default {
    prelude: null,
    parse: {
        prelude: null,
        
        /**
         * Parse the @theme block, handling wildcard properties
         * @this {ParserContext}
         */
        block: function() {
            const children = this.createList();
            
            this.eat(tokenTypes.LeftCurlyBracket);
            this.skipSC();
            
            while (!this.eof && this.tokenType !== tokenTypes.RightCurlyBracket) {
                // Check for custom property (starts with --)
                if (this.isDelim(0x2D) && this.lookupType(1) === tokenTypes.Delim && this.isDelim(0x2D, 1)) {
                    // Parse custom property with wildcard support
                    const start = this.tokenIndex;
                    let property = '';
                    
                    // Consume '--'
                    property += this.consume(tokenTypes.Delim); // first -
                    property += this.consume(tokenTypes.Delim); // second -
                    
                    // Consume the rest of the property name, allowing * and -
                    while (!this.eof && this.tokenType !== tokenTypes.Colon) {
                        if (this.tokenType === tokenTypes.Ident) {
                            property += this.consume(tokenTypes.Ident);
                        } else if (this.isDelim(0x2D)) { // hyphen -
                            property += this.consume(tokenTypes.Delim);
                        } else if (this.isDelim(0x2A)) { // asterisk *
                            property += this.consume(tokenTypes.Delim);
                        } else if (this.tokenType === tokenTypes.WhiteSpace) {
                            // Skip whitespace in property names
                            this.next();
                        } else {
                            break;
                        }
                    }
                    
                    this.eat(tokenTypes.Colon);
                    this.skipSC();
                    
                    const value = /** @type {ConsumerFunction} */ (this.Value)();
                    
                    children.push({
                        type: 'Declaration',
                        loc: this.getLocation(start, this.tokenIndex),
                        important: false,
                        property: property.trim(),
                        value: /** @type {any} */ (value)
                    });
                } else {
                    // Fall back to default declaration parsing
                    children.push(/** @type {ConsumerFunction} */ (this.Declaration)());
                }
                
                this.skipSC();
            }
            
            this.eat(tokenTypes.RightCurlyBracket);
            
            return /** @type {ConsumerFunction} */ (this.createBlock)(children);
        }
    }
};