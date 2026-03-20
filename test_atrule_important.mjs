import { tailwind3 } from './dist/index.js';
import { fork } from '@eslint/css-tree';

const { parse, toPlainObject } = fork(tailwind3);

// Check what an atrule looks like with structure
const result = parse('a { @supports (display: flex) { color: red; } }');
const plain = toPlainObject(result);
const atrule = plain.children[0].block.children[0];
console.log('Standard @supports atrule structure:');
console.log(JSON.stringify(atrule, null, 2));
