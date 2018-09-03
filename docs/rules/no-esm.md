# Report ESM import calls and export. (nebulas/no-esm)

Report `import xxx` and `export xxx` at the module scope.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import xxx from 'crypto.js'
```

Examples of **correct** code for this rule:

```js
const xxx = require('crypto.js')
```
