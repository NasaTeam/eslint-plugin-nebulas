# eslint-plugin-nebulas

smart contract lint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add -D eslint
```

Next, install `eslint-plugin-nebulas`:

```
$ yarn add -D eslint-plugin-nebulas
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-nebulas` globally.

## Usage

Add `nebulas` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["nebulas"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "nebulas/rule-name": 2
  }
}
```

## Supported Rules

- Ensure an export is a smart contract object ([export-contract](docs/rules/export-contract.md))
- Ensure an export is present ([export](docs/rules/export.md))
- Report unsupported third-party library ([limited-libs](docs/rules/limited-libs.md))
- Report ESM import calls and export ([no-esm](docs/rules/no-esm.md))
