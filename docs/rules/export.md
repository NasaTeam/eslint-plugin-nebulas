# Ensure an export is present. (nebulas/export)

A smart contract file must includes a `module.exports` expression.

## Rule Details

Examples of **incorrect** code for this rule:

```js
class Contract {}
```

Examples of **correct** code for this rule:

```js
class Contract {}
module.exports = Contract
```
