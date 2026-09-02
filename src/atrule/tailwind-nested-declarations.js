/**
 * @fileoverview Block parser hook for Tailwind 4 at-rules whose bodies may
 * freely mix declarations with nested rules (e.g. `@utility`, `@variant`).
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { ParserContext, CssNode } from "@eslint/css-tree";
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Parses a block that may contain both declarations and nested rules.
 *
 * Without this hook, css-tree's default heuristic for at-rule blocks
 * (`isDeclarationBlockAtrule`) treats the block as either "all declarations"
 * or "all rules" based on whether a `{` or `@` appears before the first `}`.
 * That heuristic misclassifies bodies that mix declarations with nested
 * rules, such as `@utility sf { color: red; & span { color: blue; } }`,
 * causing the declarations to be swallowed into the following rule's
 * selector prelude.
 * @this {ParserContext}
 * @returns {CssNode} The parsed `Block` node.
 */
function block() {
	return /** @type {CssNode} */ (
		this.Block(true, { allowNestedRules: true })
	);
}

export default {
	parse: {
		block,
	},
};
