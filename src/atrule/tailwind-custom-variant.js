/**
 * @fileoverview Tailwind 4 @custom-variant rule parser
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

            // First, we expect an identifier (the variant name)
            if (this.tokenType === tokenTypes.Ident) {
                children.push(/** @type {ConsumerFunction} */ (this.Identifier)());
                this.skipSC();
            }

            // Then, we may have a parentheses block (for single-line form)
            if (this.tokenType === tokenTypes.LeftParenthesis) {
                children.push(/** @type {ConsumerFunction} */ (this.Parentheses)());
                this.skipSC();
            }
            
            return children;
        },
        
        block: null // Let default parsing handle blocks
    }
};