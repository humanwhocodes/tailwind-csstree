/**
 * @fileoverview Tailwind 3 @apply rule parser
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "../token-types.js";

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

const EXCLAMATIONMARK = 0x0021;
const SOLIDUS = 0x002f;

/**
 * Determines if the current token is `important`.
 * @param {ParserContext} parser
 * @returns {boolean}
 */
function isImportantIdentifier(parser) {
	return (
		parser.tokenType === tokenTypes.Ident &&
		parser.cmpStr(parser.tokenStart, parser.tokenEnd, "important")
	);
}

/**
 * Adds an important modifier to a parsed utility class.
 * @param {any} utilityClass
 * @param {"prefix" | "suffix"} position
 * @returns {any}
 */
function addImportantModifier(utilityClass, position) {
	if (utilityClass.type === "TailwindUtilityClass") {
		utilityClass.name = {
			...utilityClass.name,
			name:
				position === "prefix"
					? `!${utilityClass.name.name}`
					: `${utilityClass.name.name}!`,
		};
		return utilityClass;
	}

	return {
		...utilityClass,
		name:
			position === "prefix"
				? `!${utilityClass.name}`
				: `${utilityClass.name}!`,
	};
}

/** @type {any} */
const tailwindApply = {
	parse: {
		/**
		 * @this {ParserContext}
		 */
		prelude: function () {
			const children = this.createList();
			this.important = false;

			while (true) {
				this.skipSC();

				let hasLeadingImportantModifier = false;
				if (this.isDelim(EXCLAMATIONMARK)) {
					this.next();

					if (isImportantIdentifier(this)) {
						// Consume `important` so Atrule parser can continue from the next token.
						this.Identifier();
						this.important = true;
						this.skipSC();
						break;
					}

					if (this.tokenType === tokenTypes.WhiteSpace) {
						this.skipSC();

						if (isImportantIdentifier(this)) {
							this.error(
								"Expected '!important' without whitespace in @apply directive",
								0,
							);
						}
					}

					hasLeadingImportantModifier = true;
				}

				if (this.tokenType !== tokenTypes.Ident) {
					if (hasLeadingImportantModifier) {
						this.error(
							"Expected identifier after '!' in @apply directive",
							0,
						);
					}
					break;
				}

				let utilityClass;
				if (
					this.lookupType(1) === tokenTypes.Colon ||
					this.lookupType(1) === tokenTypes.LeftSquareBracket ||
					this.isDelim(SOLIDUS, 1)
				) {
					// This is a variant like hover: or an arbitrary utility like grid-cols-[...] - use TailwindUtilityClass
					utilityClass = /** @type {ConsumerFunction} */ (
						this.TailwindUtilityClass
					)();
				} else {
					// Simple identifier - use Identifier parser
					utilityClass = /** @type {ConsumerFunction} */ (
						this.Identifier
					)();
				}

				if (hasLeadingImportantModifier) {
					utilityClass = addImportantModifier(utilityClass, "prefix");
				}

				if (this.isDelim(EXCLAMATIONMARK)) {
					if (hasLeadingImportantModifier) {
						this.error(
							"Important modifier can only appear once per utility in @apply directive",
							0,
						);
					}

					this.next();

					if (isImportantIdentifier(this)) {
						// Consume `important` so Atrule parser can continue from the next token.
						this.Identifier();
						this.important = true;
						children.push(utilityClass);
						this.skipSC();
						break;
					}

					if (this.tokenType === tokenTypes.WhiteSpace) {
						this.skipSC();

						if (isImportantIdentifier(this)) {
							this.error(
								"Expected '!important' without whitespace in @apply directive",
								0,
							);
						}
					}

					utilityClass = addImportantModifier(utilityClass, "suffix");
				}

				children.push(utilityClass);
			}

			return children;
		},
		block: null,
	},
};

export default tailwindApply;
