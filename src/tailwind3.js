/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { lexer, definitionSyntax } from "@eslint/css-tree";
import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import * as TailwindUtilityClass from "./node/tailwind-class.js";
import tailwindApply from "./atrule/tailwind-apply.js";
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
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 * @import { SyntaxConfig } from "@eslint/css-tree"
 */

/** @type {Partial<SyntaxConfig>} */
export const tailwind3 = {
	atrule: {
		apply: tailwindApply,
	},
	atrules: {
		apply: {
			prelude: "<tw-apply-ident>+",
		},
		tailwind: {
			prelude: "base | components | utilities | variants",
		},
		config: {
			prelude: "<string>",
		},
	},
	types: {
		"length-percentage": `${getDefaultTypeSyntax("length-percentage")} | <tw-theme-spacing>`,
		color: `${getDefaultTypeSyntax("color")} | <tw-theme-color>`,
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
