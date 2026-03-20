/**
 * @fileoverview Tests for runtime dependency behavior.
 */

import assert from "node:assert";
import fs from "node:fs/promises";

describe("Runtime dependencies", () => {
	it("should not have runtime imports from @eslint/css-tree in src", async () => {
		const sourceFiles = [
			"./src/atrule/tailwind-apply.js",
			"./src/atrule/tailwind-import.js",
			"./src/node/tailwind-class.js",
			"./src/node/tailwind-theme-key.js",
		];

		for (const file of sourceFiles) {
			const contents = await fs.readFile(file, "utf8");
			assert.ok(
				!contents.includes(
					'import { tokenTypes } from "@eslint/css-tree";',
				),
				`Expected no runtime tokenTypes import from @eslint/css-tree in ${file}`,
			);
		}
	});
});
