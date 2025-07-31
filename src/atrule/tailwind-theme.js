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
// Helpers
//-----------------------------------------------------------------------------

/**
 * Parse a wildcard declaration
 * @this {ParserContext}
 */
function parseWildcardDeclaration() {
    const start = this.tokenIndex;
    let property = '';
    
    // Parse property name allowing wildcards
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
    
    const value = /** @type {any} */ (this).Value();
    
    return {
        type: 'Declaration',
        loc: this.getLocation(start, this.tokenIndex),
        important: false,
        property: property.trim(),
        value: value
    };
}

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
            const self = /** @type {any} */ (this);
            return self.Block(function() {
                while (!self.eof) {
                    // Always try to parse as wildcard first
                    try {
                        self.push(parseWildcardDeclaration.call(self));
                    } catch {
                        // If wildcard parsing fails, try regular declaration
                        try {
                            self.Declaration();
                        } catch {
                            // If all parsing fails, parse as raw
                            self.Raw(self.tokenIndex, null, false);
                        }
                    }
                }
            });
        }
    }
};