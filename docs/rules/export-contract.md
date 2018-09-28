# Ensure an export is a smart contract object. (nebulas/export-contract)

Ensure an export is a smart contract object (a constructor function or class which includes a 'init' method).

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
