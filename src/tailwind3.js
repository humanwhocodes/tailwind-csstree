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
import { tokenTypes } from "./token-types.js";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @typedef {import("@eslint/css-tree").NodeSyntaxConfig} NodeSyntaxConfig
 * @import { SyntaxConfig, SyntaxExtensionCallback } from "@eslint/css-tree"
 */

/** @type {SyntaxExtensionCallback} */
export const tailwind3 = prev => {
	const previousAtrule = prev.node?.Atrule;
	const previousAtruleNode =
		typeof previousAtrule === "function"
			? { parse: previousAtrule }
			: previousAtrule;
	const previousAtruleParse = previousAtruleNode?.parse;
	const previousAtruleGenerate = previousAtruleNode?.generate;

	return {
		...prev,
		node: {
			...prev.node,
			...(previousAtruleParse
				? {
						Atrule: {
							...previousAtruleNode,
							...(previousAtruleGenerate
								? {
										/**
										 * @this {any}
										 * @param {any} node
										 */
										generate(node) {
											if (
												node.name.toLowerCase() !==
													"apply" ||
												node.important !== true
											) {
												return previousAtruleGenerate.call(
													this,
													node,
												);
											}

											this.token(
												tokenTypes.AtKeyword,
												`@${node.name}`,
											);
											if (node.prelude) {
												this.node(node.prelude);
											}
											this.token(
												tokenTypes.WhiteSpace,
												" ",
											);
											this.tokenize("!important");
											if (node.block) {
												this.node(node.block);
											} else {
												this.token(
													tokenTypes.Semicolon,
													";",
												);
											}
										},
									}
								: {}),
							/** @this {any} */
							parse(isDeclaration, options) {
								try {
									const result = /** @type {any} */ (
										previousAtruleParse.call(
											this,
											isDeclaration,
											options,
										)
									);

									if (
										result?.type === "Atrule" &&
										result.name?.toLowerCase?.() ===
											"apply" &&
										this.important === true
									) {
										result.important = true;
									}

									return result;
								} finally {
									if ("important" in this) {
										// `important` is temporary @apply parser state. We delete it in `finally`
										// because parsing can throw before a clean reset (for example, `!foo`
										// triggers the invalid-`!important` error path), and parser context is reused.
										delete this.important;
									}
								}
							},
						},
					}
				: {}),
			TailwindThemeKey,
			TailwindUtilityClass,
		},
		atrule: {
			...prev.atrule,
			apply: tailwindApply,
		},
		atrules: {
			...prev.atrules,
			apply: {
				prelude: "<tw-apply-ident>+ [ '!' important ]?",
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
			"length-percentage": `${prev.types["length-percentage"]} | <tw-theme-spacing> | <tw-theme-screens>`,
			color: `${prev.types.color} | <tw-theme-color>`,
			"tw-apply-ident":
				"<tw-important-ident> | <tw-important-utility-with-variant> | <tw-important-utility-with-opacity>",
			"tw-important-ident": "<ident> | [ '!' <ident> ] | [ <ident> '!' ]",
			"tw-utility-with-variant":
				"[ <ident> ':' ]+ <ident> [ '/' [ <number> | <ident> ] ]?",
			"tw-important-utility-with-variant":
				"<tw-utility-with-variant> | [ '!' <tw-utility-with-variant> ] | [ <tw-utility-with-variant> '!' ]",
			"tw-utility-with-opacity":
				"[ <ident> '/' <number> ] | [ <ident> '/' <ident> ]",
			"tw-important-utility-with-opacity":
				"<tw-utility-with-opacity> | [ '!' <tw-utility-with-opacity> ] | [ <tw-utility-with-opacity> '!' ]",
			...themeTypes,
		},
		features: {
			...prev.features,
			media: {
				...prev.features?.media,
				screen() {
					return this.Identifier();
				},
			},
		},
		scope: {
			...prev.scope,
			Value: {
				...prev.scope?.Value,
				theme,
			},
		},
	};
};
