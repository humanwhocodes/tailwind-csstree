import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import css from "@eslint/css";
import defaultSyntax from "@eslint/css-tree/definition-syntax-data";
import { tailwind3 } from "./src/tailwind3.js";
import { tailwind4 } from "./src/tailwind4.js";

// For ESLint CSS plugin, we need Partial<SyntaxConfig> objects with string values.
// Our exports are functions that receive the base config, so we call them here.
const tw3Config = tailwind3(defaultSyntax);
const tw4Config = tailwind4(defaultSyntax);

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
	},
	{
		files: ["tests/**/*.js"],
		languageOptions: {
			globals: {
				describe: false,
				it: false,
				beforeEach: false,
				afterEach: false,
				setTimeout: false,
				AbortSignal: false,
				AbortController: false,
			},
		},
	},
	{
		files: ["**/*.css"],
		plugins: {
			css,
		},
		language: "css/css",
		extends: ["css/recommended"],
	},
	{
		files: ["tests/fixtures/tailwind3.css"],
		languageOptions: {
			customSyntax: tw3Config,
		},
	},
	{
		files: ["tests/fixtures/tailwind4.css"],
		languageOptions: {
			customSyntax: tw4Config,
		},
	},
]);
