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
				this.error(
					"Expected variant name identifier after @custom-variant",
					0,
				);
				return children;
			}

			children.push(this.Identifier());
			this.skipSC();

			// Parse the inline selector form: @custom-variant name (selector)
			if (this.tokenType === tokenTypes.LeftParenthesis) {
				/*
				 * Consume until semicolon (or `{` for recovery) so we keep the
				 * selector payload, including nested parentheses.
				 */
				children.push(
					this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true),
				);
			}

			return children;
		},
	},
};
