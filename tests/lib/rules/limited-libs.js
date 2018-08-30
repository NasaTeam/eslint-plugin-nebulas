/**
 * @fileoverview Report unsupported third-party library.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/limited-libs')
const RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } })

ruleTester.run('limited-libs', rule, {
  valid: [{ code: 'require("crypto.js")' }, { code: 'const xxx = require("crypto.js")' }],

  invalid: [
    {
      code: 'const xxx = require("xxxxx")',
      errors: [
        {
          messageId: 'unsupported'
        }
      ]
    },
    {
      code: 'const path = require("path")',
      errors: [
        {
          messageId: 'unsupported'
        }
      ]
    }
  ]
})
