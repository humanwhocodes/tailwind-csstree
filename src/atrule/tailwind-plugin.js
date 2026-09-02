/**
 * @fileoverview Tailwind 4 `@plugin` rule parser.
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
		 * Parses the optional block of a `@plugin` rule as a raw block so that
		 * plugin-specific option properties (which are not standard CSS
		 * properties) are preserved as raw text and do not trigger
		 * descriptor-validation lint errors.
		 * @this {ParserContext}
		 * @returns {any}
		 */
		block() {
			const start = this.tokenStart;
			const children = this.createList();

			this.eat(tokenTypes.LeftCurlyBracket);

			const raw = this.Raw(null, true);

			if (raw.value) {
				children.appendData(raw);
			}

			if (!this.eof) {
				this.eat(tokenTypes.RightCurlyBracket);
			}

			return {
				type: "Block",
				loc: this.getLocation(start, this.tokenStart),
				children,
			};
		},
	},
};
