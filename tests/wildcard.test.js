import assert from "node:assert";
import { tailwind4 } from "../src/tailwind4.js";
import { fork } from "@eslint/css-tree";

describe("Wildcard Property Parsing", function () {
    
    let parse, toPlainObject;
    beforeEach(() => {
        ({ parse, toPlainObject } = fork(tailwind4));
    });

    it("should parse --color-* as Declaration in @theme", () => {
        const css = `@theme {
  --color-*: initial;
}`;
        const tree = toPlainObject(parse(css));
        
        const atrule = tree.children[0];
        assert.strictEqual(atrule.type, "Atrule");
        assert.strictEqual(atrule.name, "theme");
        
        const declaration = atrule.block.children[0];
        assert.strictEqual(declaration.type, "Declaration", "Should be Declaration, not Raw");
        assert.strictEqual(declaration.property, "--color-*");
    });
});