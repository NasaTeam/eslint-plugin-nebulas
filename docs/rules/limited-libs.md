# Report unsupported third-party library. (nebulas/limited-libs)

Supported third-party libs:

- crypto.js

## Rule Details

Examples of **incorrect** code for this rule:

```js
const xxx = require('path')
```

Examples of **correct** code for this rule:

```js
const xxx = require('crypto.js')
```
