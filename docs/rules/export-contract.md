# Ensure an export is a smart contract object. (nebulas/export-contract)

Ensure an export is a smart contract object (a construct function or class which has a 'init' method).

## Rule Details

Examples of **incorrect** code for this rule:

```js
class Contract {}
module.exports = Contract
```

Examples of **correct** code for this rule:

```js
class Contract {
  init() {}
}
module.exports = Contract
```
