/**
 * @fileoverview Tailwind @apply atrule node with !important support
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { tokenTypes } from "@eslint/css-tree";

//-----------------------------------------------------------------------------
// Type Definitions
//-----------------------------------------------------------------------------

/**
 * @import { ParserContext } from "@eslint/css-tree";
 */

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

/**
 * Parse @apply atrule with !important support
 * @this {ParserContext}
 */
export function parse() {
    const node = {
        type: 'Atrule',
        loc: this.getLocation(this.tokenStart, this.tokenEnd),
        name: null,
        prelude: null,
        block: null,
        important: false
    };

    this.eat(3); // eat @
    node.name = this.consume(1); // consume identifier (should be "apply")

    this.skipSC();

    // Parse the prelude (identifiers and !important)
    if (this.tokenType !== 23 && this.tokenType !== 17) { // not { and not ;
        const children = this.createList();

        while (this.tokenType === 1) { // Ident
            if (this.lookupType(1) === 16) { // Colon - variant syntax
                children.push(this.TailwindUtilityClass());
            } else {
                children.push(this.Identifier());
            }
            this.skipSC();
        }

        // Check for !important at the end
        if (this.tokenType === 9 && this.source.charCodeAt(this.tokenStart) === 33) { // 33 is '!'
            this.next(); // consume !
            this.skipSC();
            
            if (this.tokenType === 1 && this.source.slice(this.tokenStart, this.tokenEnd) === "important") {
                this.next(); // consume important
                node.important = true;
            }
        }

        node.prelude = {
            type: 'AtrulePrelude',
            loc: this.getLocationFromList(children),
            children: children
        };
    }

    if (this.tokenType === 23) { // {
        node.block = this.Block(true);
    } else {
        this.eat(17); // ;
    }

    return node;
}

/**
 * Generate @apply atrule
 * @param {*} node 
 */
export function generate(node) {
    this.token(3, '@');
    this.token(1, node.name);

    if (node.prelude) {
        this.token(13, ' ');
        this.node(node.prelude);
        if (node.important) {
            this.token(13, ' ');
            this.token(9, '!');
            this.token(1, 'important');
        }
    }

    if (node.block) {
        this.node(node.block);
    } else {
        this.token(17, ';');
    }
}