/**
 * @fileoverview Types for the Tailwind theme() function.
 * @author Nicholas C. Zakas
 */

export const themeTypes = {
	"tw-theme-spacing":
		"<tw-theme-spacing-number> | <tw-theme-spacing-brackets> | <tw-theme-string>",
	"tw-theme-string": "theme(<string>)",
	"tw-theme-spacing-number": "theme(spacing [ '.' <integer> | <number> ])",
	"tw-theme-spacing-brackets": "theme(spacing '[' <number> ']' )",
	"tw-theme-color":
		"theme(colors '.' <ident-token> [ '.' [<ident-token> | <number>] | <number> ] [ / <percentage>]?) | theme(<string> [ / <percentage>]?)",
	"tw-theme-screens": "theme(screens '.' <ident-token>) | <tw-theme-string>",
};
