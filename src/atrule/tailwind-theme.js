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
    parse: {
        prelude: null,
        
        /**
         * Parse the @theme block, handling wildcard properties
         * @this {ParserContext}
         */
        block: function() {
            return this.Block(function() {
                while (!this.eof) {
                    if (this.tokenType === tokenTypes.Delim && this.tokenValue === '-' &&
                        this.lookupType(1) === tokenTypes.Delim && this.lookupValue(1) === '-') {
                        // This looks like a custom property, use our custom parser
                        this.parseThemeDeclaration();
                    } else {
                        // Use default declaration parsing
                        this.Declaration();
                    }
                }
            });
        }
    },
    
    /**
     * Parse a declaration in @theme that may have wildcard property names
     * @this {ParserContext}
     */
    parseThemeDeclaration: function() {
        const start = this.tokenIndex;
        let property = '';
        
        // Parse property name, allowing wildcards
        while (!this.eof && this.tokenType !== tokenTypes.Colon) {
            if (this.tokenType === tokenTypes.Ident) {
                property += this.consume(tokenTypes.Ident);
            } else if (this.tokenType === tokenTypes.Delim) {
                property += this.consume(tokenTypes.Delim);
            } else if (this.tokenType === tokenTypes.WhiteSpace) {
                this.skipSC();
            } else {
                break;
            }
        }
        
        this.eat(tokenTypes.Colon);
        this.skipSC();
        
        const value = this.Value();
        
        return {
            type: 'Declaration',
            loc: this.getLocation(start, this.tokenIndex),
            important: false,
            property: property.trim(),
            value: value
        };
    }
};