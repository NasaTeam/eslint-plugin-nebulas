/**
 * @fileoverview Report ESM import calls and export.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-esm')
const RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } })

ruleTester.run('no-esm', rule, {
  valid: [{ code: 'module.exports = Contract' }, { code: 'const xxx = require("crypto.js")' }],

  invalid: [
    {
      code: 'import xxx from "crypto.js"',
      errors: [
        {
          messageId: 'import'
        }
      ]
    },
    {
      code: 'export default xxx',
      errors: [
        {
          messageId: 'export'
        }
      ]
    },
    {
      code: 'export {}',
      errors: [
        {
          messageId: 'export'
        }
      ]
    }

  ]
})
