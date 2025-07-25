import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import css from "@eslint/css";
import { tailwind3 } from "./src/tailwind3.js";
import { tailwind4 } from "./src/tailwind4.js";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.js"],
		plugins: {
			js
		},
		extends: ["js/recommended"]
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
			css
		},
		language: "css/css",
		extends: ["css/recommended"],
	},
	{
		files: ["tests/fixtures/tailwind3.css"],
		languageOptions: {
			customSyntax: tailwind3,
		}
	},
	{
		files: ["tests/fixtures/tailwind4.css"],
		languageOptions: {
			customSyntax: tailwind4,
		}
	},
]);
