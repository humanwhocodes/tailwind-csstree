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
            let hasImportant = false;

            while (this.tokenType === tokenTypes.Ident) {
                
                if (this.lookupType(1) === tokenTypes.Colon) {
                    children.push(/** @type {ConsumerFunction} */ (this.TailwindUtilityClass)());
                } else {
                    children.push(/** @type {ConsumerFunction} */ (this.Identifier)());
                }
                
                this.skipSC();
            }
            
            // Check for !important at the end
            if (this.tokenType === tokenTypes.Delim && this.source.charCodeAt(this.tokenStart) === 33) { // 33 is '!'
                this.next(); // consume !
                this.skipSC();
                
                if (this.tokenType === tokenTypes.Ident && this.source.slice(this.tokenStart, this.tokenEnd) === "important") {
                    this.next(); // consume important
                    hasImportant = true;
                }
            }
            
            return children;
        },
        block: null
    }
};
