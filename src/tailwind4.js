/**
 * @fileoverview Tailwind 4 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { lexer, definitionSyntax } from "@eslint/css-tree";
import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import * as TailwindUtilityClass from "./node/tailwind-class.js";
import tailwindApply from "./atrule/tailwind-apply.js";
import tailwindImport from "./atrule/tailwind-import.js";
import theme from "./scope/theme.js";
import { themeTypes } from "./types/theme-types.js";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

/**
 * Get the CSS syntax string for a type from the default lexer.
 * @param {string} typeName The type name to get syntax for
 * @returns {string} The CSS syntax string
 */
function getDefaultTypeSyntax(typeName) {
	// @ts-expect-error - lexer has types property at runtime but not in type definitions
	return definitionSyntax.generate(lexer.types[typeName].syntax);
}

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { SyntaxConfig } from "@eslint/css-tree"
 */

/** @type {Partial<SyntaxConfig>} */
export const tailwind4 = {
	atrule: {
		apply: tailwindApply,
		import: tailwindImport,
	},
	atrules: {
		import: {
			prelude:
				"[ <string> | <url> ] [ [ source( [ <string> | none ] ) ]? || [ prefix( <ident> ) ]? || [ layer | layer( <layer-name> ) ]? ] [ supports( [ <supports-condition> | <declaration> ] ) ]? <media-query-list>?",
		},
		apply: {
			prelude: "<tw-apply-ident>+",
		},
		config: {
			prelude: "<string>",
		},
		theme: {
			prelude: null,
			// @ts-expect-error - lexer has properties property at runtime but not in type definitions
			descriptors: lexer.properties,
		},
		source: {
			prelude: "not? [ <string> | inline(<string>) ]",
		},
		utility: {
			prelude: "<ident>",
		},
		variant: {
			prelude: "<ident>",
			// @ts-expect-error - lexer has properties property at runtime but not in type definitions
			descriptors: lexer.properties,
		},
		"custom-variant": {
			prelude: "<ident> <parentheses-block>",
		},
		plugin: {
			prelude: "<string>",
		},
		reference: {
			prelude: "<string>",
		},
	},
	types: {
		"length-percentage": `${getDefaultTypeSyntax("length-percentage")} | <tw-any-spacing>`,
		color: `${getDefaultTypeSyntax("color")} | <tw-any-color>`,
		"tw-alpha": `--alpha(<color> / <percentage>)`,
		"tw-spacing": "--spacing(<number>)",
		"tw-any-spacing": "<tw-spacing> | <tw-theme-spacing>",
		"tw-any-color": "<tw-alpha> | <tw-theme-color>",
		"tw-apply-ident": "<ident> | [ <ident> ':' <ident> ]",
		...themeTypes,
	},
	node: {
		TailwindThemeKey,
		TailwindUtilityClass,
	},
	scope: {
		Value: {
			theme,
		},
	},
};
