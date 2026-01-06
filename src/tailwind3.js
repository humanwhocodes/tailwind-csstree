/**
 * @fileoverview Tailwind 3 Custom Syntax for CSSTree.
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import * as TailwindThemeKey from "./node/tailwind-theme-key.js";
import * as TailwindUtilityClass from "./node/tailwind-class.js";
import tailwindApply from "./atrule/tailwind-apply.js";
import theme from "./scope/theme.js";
import { themeTypes } from "./types/theme-types.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 * @import { SyntaxConfig, SyntaxExtensionCallback } from "@eslint/css-tree"
 */

/** @type {SyntaxExtensionCallback} */
export const tailwind3 = prev => ({
	...prev,
	atrule: {
		...prev.atrule,
		apply: tailwindApply,
	},
	atrules: {
		...prev.atrules,
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
		...prev.types,
		"length-percentage": `${prev.types["length-percentage"]} | <tw-theme-spacing>`,
		color: `${prev.types.color} | <tw-theme-color>`,
		"tw-apply-ident":
			"<ident> | <tw-utility-with-variant> | <tw-utility-with-opacity>",
		"tw-utility-with-variant":
			"[ <ident> ':' <ident> ] | [ <ident> ':' <ident> '/' <number> ] | [ <ident> ':' <ident> '/' <ident> ]",
		"tw-utility-with-opacity":
			"[ <ident> '/' <number> ] | [ <ident> '/' <ident> ]",
		...themeTypes,
	},
	node: {
		...prev.node,
		TailwindThemeKey,
		TailwindUtilityClass,
	},
	scope: {
		...prev.scope,
		Value: {
			...prev.scope?.Value,
			theme,
		},
	},
});
