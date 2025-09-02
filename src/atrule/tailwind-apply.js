/**
 * @fileoverview Tailwind 3 @apply rule parser
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
        
        /**
         * @this {ParserContext}
         */
        prelude: function() {
            const children = this.createList();

            while (this.tokenType === tokenTypes.Ident) {
                
                if (this.lookupType(1) === tokenTypes.Colon) {
                    // This is a variant like hover:
                    children.push(/** @type {ConsumerFunction} */ (this.TailwindUtilityClass)());
                } else if (this.lookupType(1) === tokenTypes.Delim && 
                           this.lookupValue(1, '/') &&
                           (this.lookupType(2) === tokenTypes.Ident || this.lookupType(2) === tokenTypes.Number)) {
                    // This is opacity notation like outline-ring/50
                    children.push(/** @type {ConsumerFunction} */ (this.TailwindUtilityClass)());
                } else {
                    // Simple identifier
                    children.push(/** @type {ConsumerFunction} */ (this.Identifier)());
                }
                
                this.skipSC();
            }
            
            return children;
        },
        block: null
    }
};
