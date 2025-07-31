/**
 * @fileoverview Tailwind 4 @theme rule parser
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "@eslint/css-tree";

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
                    // Always try to parse as wildcard first
                    try {
                        this.push(parseWildcardDeclaration.call(this));
                    } catch (e) {
                        // If wildcard parsing fails, try regular declaration
                        try {
                            this.Declaration();
                        } catch (e2) {
                            // If all parsing fails, parse as raw
                            this.Raw(this.tokenIndex, null, false);
                        }
                    }
                }
            });
        }
    }
};

/**
 * Check if current tokens represent a wildcard custom property
 * @this {ParserContext}
 */
function isWildcardProperty() {
    // Look ahead to see if we have --something-*:
    if (this.tokenType === tokenTypes.Delim && this.tokenValue === '-' &&
        this.lookupType(1) === tokenTypes.Delim && this.lookupValue(1) === '-') {
        
        // Scan ahead to look for * before :
        let i = 2;
        while (i < 20) { // reasonable lookahead limit
            const type = this.lookupType(i);
            const value = this.lookupValue(i);
            
            if (type === tokenTypes.Colon) {
                return false; // reached colon without finding *
            }
            if (type === tokenTypes.Delim && value === '*') {
                return true; // found wildcard
            }
            if (type === 0) { // EOF
                return false;
            }
            i++;
        }
    }
    return false;
}

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
    
    const value = this.Value();
    
    return {
        type: 'Declaration',
        loc: this.getLocation(start, this.tokenIndex),
        important: false,
        property: property.trim(),
        value: value
    };
}