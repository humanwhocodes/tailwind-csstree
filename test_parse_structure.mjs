import { tailwind3 } from './dist/index.js';

// Get the base syntax config to understand the structure
const config = tailwind3({
  atrules: {},
  atrule: {},
  types: {},
  node: {},
  scope: {},
  properties: {}
});

console.log('Apply atrule config:');
console.log(JSON.stringify(config.atrules?.apply, null, 2));
console.log('\nApply atrule parser config:');
console.log(typeof config.atrule?.apply);
