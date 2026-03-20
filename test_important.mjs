import { tailwind3 } from './dist/index.js';
import { fork } from '@eslint/css-tree';

const { parse, toPlainObject } = fork(tailwind3);

// Test without !important
console.log('Test 1: @apply without !important');
try {
  const result1 = parse('a { @apply text-center; }');
  const plain1 = toPlainObject(result1);
  const atrule1 = plain1.children[0].block.children[0];
  console.log(JSON.stringify(atrule1, null, 2));
} catch (e) {
  console.log('ERROR:', e.message);
}

console.log('\n\nTest 2: @apply with !important');
try {
  const result2 = parse('a { @apply text-center !important; }');
  const plain2 = toPlainObject(result2);
  const atrule2 = plain2.children[0].block.children[0];
  console.log(JSON.stringify(atrule2, null, 2));
} catch (e) {
  console.log('ERROR:', e.message);
}
