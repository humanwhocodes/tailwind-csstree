/**
 * @fileoverview Utility functions for handling !important in @apply directives
 * @author Nicholas C. Zakas
 */

//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------

import { fork as baseFork } from "@eslint/css-tree";

//-----------------------------------------------------------------------------
// Helper Functions
//-----------------------------------------------------------------------------

/**
 * Walk through AST and add important property to @apply atrules that need it
 * @param {Object} ast - CSS AST
 * @param {string} originalSource - Original CSS source code
 * @returns {Object} Modified AST
 */
export function addImportantToApplyAtrules(ast, originalSource) {
    
    function walk(/** @type {any} */ node) {
        if (!node || typeof node !== 'object') {
            return;
        }

        // Check if this is an @apply atrule
        if (node.type === 'Atrule' && node.name === 'apply' && node.loc) {
            // Extract the original source for this atrule to see if it had !important
            const start = node.loc.start.offset;
            const end = node.loc.end.offset;
            const atruleSource = originalSource.slice(start, end);
            
            // If the original source contains !important, add the flag
            if (atruleSource.includes('!important')) {
                /** @type {any} */ (node).important = true;
            }
        }

        // Recursively walk children
        if (node.children) {
            if (Array.isArray(node.children)) {
                node.children.forEach(/** @param {any} child */ (child) => walk(child));
            } else if (node.children.forEach) {
                // Handle CSS Tree List objects
                node.children.forEach(/** @param {any} child */ (child) => walk(child));
            }
        }
        
        if (node.prelude) {
            walk(node.prelude);
        }
        
        if (node.block) {
            walk(node.block);
        }
    }

    walk(ast);
    return ast;
}

/**
 * Create a CSS Tree fork with automatic !important support for @apply
 * @param {Object} config - CSS Tree configuration
 * @returns {Object} Enhanced CSS Tree fork
 */
export function forkWithApplyImportant(config) {
    const parser = baseFork(config);
    const originalParse = parser.parse;

    parser.parse = function(source, options) {
        // Parse with positions enabled to get offset information
        const parseOptions = { ...options, positions: true };
        const result = originalParse.call(this, source, parseOptions);
        
        // Apply !important post-processing for Tailwind configs
        if (config && config.atrule && config.atrule.apply) {
            return addImportantToApplyAtrules(result, source);
        }
        
        return result;
    };

    return parser;
}