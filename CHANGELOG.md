# Changelog

## [0.3.1](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.3.0...tailwind-csstree-v0.3.1) (2026-04-10)


### Bug Fixes

* Tailwind 4 `[@custom-variant](https://github.com/custom-variant)` parsing for ESLint CSS plugin and expand syntax coverage ([#54](https://github.com/humanwhocodes/tailwind-csstree/issues/54)) ([fc4e117](https://github.com/humanwhocodes/tailwind-csstree/commit/fc4e1172731ce3dd401996c85fd5c4369cae989c))

## [0.3.0](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.2.0...tailwind-csstree-v0.3.0) (2026-03-24)


### Features

* **tailwind3:** implement [@media](https://github.com/media) screen() function support ([#50](https://github.com/humanwhocodes/tailwind-csstree/issues/50)) ([b8f5e99](https://github.com/humanwhocodes/tailwind-csstree/commit/b8f5e99aad361addef580dc0634cb6f492815952))


### Bug Fixes

* Tailwind 3 `[@apply](https://github.com/apply) ... !important` support ([#49](https://github.com/humanwhocodes/tailwind-csstree/issues/49)) ([9e520af](https://github.com/humanwhocodes/tailwind-csstree/commit/9e520afcdc598f605908f683f13386a96d0ba711))

## [0.2.0](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.5...tailwind-csstree-v0.2.0) (2026-03-20)


### Features

* Tailwind 4 `[@custom-variant](https://github.com/custom-variant)` and `[@slot](https://github.com/slot)` at-rule support ([#42](https://github.com/humanwhocodes/tailwind-csstree/issues/42)) ([9b5fe90](https://github.com/humanwhocodes/tailwind-csstree/commit/9b5fe909be05b94db2bd51931614d3ee8fcc2110))


### Bug Fixes

* Decouple runtime tokenTypes from `@eslint/css-tree` ([#47](https://github.com/humanwhocodes/tailwind-csstree/issues/47)) ([09c9a5a](https://github.com/humanwhocodes/tailwind-csstree/commit/09c9a5a4167541ce68a8649e114b0002a159417b))
* Handle Tailwind v4 `[@theme](https://github.com/theme)` wildcard color declarations ([#45](https://github.com/humanwhocodes/tailwind-csstree/issues/45)) ([4077e0a](https://github.com/humanwhocodes/tailwind-csstree/commit/4077e0a526366f304ec95672fd193eb2037ef5ab))

## [0.1.5](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.4...tailwind-csstree-v0.1.5) (2026-03-16)


### Bug Fixes

* eslint/css as optional peer dependency ([1f82cba](https://github.com/humanwhocodes/tailwind-csstree/commit/1f82cba5f472e80bd959238418418136ad91dd7e))
* Use function-based syntax extensions for pnpm compatibility ([#37](https://github.com/humanwhocodes/tailwind-csstree/issues/37)) ([f0afe81](https://github.com/humanwhocodes/tailwind-csstree/commit/f0afe81f2e85f068c2e47f8fdd8d641173a3703f))

## [0.1.4](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.3...tailwind-csstree-v0.1.4) (2025-09-01)


### Bug Fixes

* Support `[@import](https://github.com/import)` source parsing ([#30](https://github.com/humanwhocodes/tailwind-csstree/issues/30)) ([8d5cd4c](https://github.com/humanwhocodes/tailwind-csstree/commit/8d5cd4c6d396c2289e216d7865f7d39ae6996cdb))

## [0.1.3](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.2...tailwind-csstree-v0.1.3) (2025-08-08)


### Bug Fixes

* parsing `[@apply](https://github.com/apply)` in Tailwind 4 ([#25](https://github.com/humanwhocodes/tailwind-csstree/issues/25)) ([1756fd1](https://github.com/humanwhocodes/tailwind-csstree/commit/1756fd13cc6fa9f2feee323dba7cff56c41b5ef6))
* parsing `[@source](https://github.com/source) inline()` ([#26](https://github.com/humanwhocodes/tailwind-csstree/issues/26)) ([94f0966](https://github.com/humanwhocodes/tailwind-csstree/commit/94f09666c201fa7d37bf2332de793da40a5a4760))

## [0.1.2](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.1...tailwind-csstree-v0.1.2) (2025-07-25)


### Bug Fixes

* Prevent parsing errors with [@import](https://github.com/import) prefix() function in TailwindCSS ([#14](https://github.com/humanwhocodes/tailwind-csstree/issues/14)) ([f6123e5](https://github.com/humanwhocodes/tailwind-csstree/commit/f6123e50485678e314c8b2f575d5ac061d1ca7c1))

## [0.1.1](https://github.com/humanwhocodes/tailwind-csstree/compare/tailwind-csstree-v0.1.0...tailwind-csstree-v0.1.1) (2025-06-17)


### Bug Fixes

* Remove accidental bin entry from package.json ([9d61c45](https://github.com/humanwhocodes/tailwind-csstree/commit/9d61c45f7a19c2782fcb73d103a37e280cb607dc))

## 0.1.0 (2025-06-05)


### Features

* Finish up Tailwind 3 compatibility ([2fcd25c](https://github.com/humanwhocodes/tailwind-csstree/commit/2fcd25cddb566dc69b346ac674501995b3e428bb))
* Make Tailwind 4 work ([91b77a7](https://github.com/humanwhocodes/tailwind-csstree/commit/91b77a7f079b01aa999016c63297ab74db74106a))
* Most of Tailwind 3 syntax working ([71c8517](https://github.com/humanwhocodes/tailwind-csstree/commit/71c85177daf938838f01474970f60d00dd0b12e7))
* Validate -alpha() and --spacing() ([dd5bc0e](https://github.com/humanwhocodes/tailwind-csstree/commit/dd5bc0e80543ff18e2975b467e1c187b4d97af14))
