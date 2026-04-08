/**
 * @fileoverview Tailwind 4 `@custom-variant` rule parser.
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "../token-types.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { ParserContext, SyntaxConfig } from "@eslint/css-tree";
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

export default {
	parse: {
		/**
		 * @this {ParserContext}
		 * @type {SyntaxConfig['atrule']['custom-variant']['parse']['prelude']}
		 */
		prelude: function () {
			const children = this.createList();

			if (this.tokenType !== tokenTypes.Ident) {
				this.error("Identifier is expected", 0);
			}

			children.push(this.Identifier());
			this.skipSC();

			if (this.tokenType === tokenTypes.LeftParenthesis) {
				children.push(
					this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true),
				);
			}

			return children;
		},
	},
};
