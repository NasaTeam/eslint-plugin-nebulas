/**
 * @fileoverview Ensure an export is present.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/export')
const RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: "module" } })

ruleTester.run('export', rule, {
  valid: [{ code: 'module.exports = Contract' }],

  invalid: [
    {
      code: 'const s = ""',
      errors: [
        {
          messageId: 'needExport'
        }
      ]
    },
    {
      code: 'class Contract {}',
      errors: [
        {
          messageId: 'needExport'
        }
      ]
    }
  ]
})
