/**
 * @fileoverview Ensure an export is a smart contract object.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/export-contract')
const RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 }, env: { node: true } })

ruleTester.run('export-contract', rule, {
  valid: [
    {
      code: `
        class Contract { init() {} }
        module.exports = Contract`
    },
    {
      code: `
        function Contract() {}
        Contract.prototype.init = ()=>{}
        module.exports = Contract`
    },
    {
      code: `
        function Contract(){}
        Contract.prototype={ init:()=>{} }
        module.exports = Contract`
    },
    {
      code: `
        function Contract(){}
        Contract.prototype={ init() {} }
        module.exports = Contract`
    },
    {
      code: `
        const o = { init(){} }
        function Contract() {}
        Contract.prototype = o
        module.exports = Contract`
    },
    {
      code: `
        const o = {}
        o.init = () => {}
        function Contract() {}
        Contract.prototype = o
        module.exports = Contract`
    }
  ],

  invalid: [
    {
      code: `module.exports = 1`,
      errors: [
        {
          messageId: 'prototypeOrClass'
        }
      ]
    },
    {
      code: `
        const s = 1
        module.exports = s`,
      errors: [
        {
          messageId: 'prototypeOrClass'
        }
      ]
    },
    {
      code: `
        const s = ""
        module.exports = s`,
      errors: [
        {
          messageId: 'prototypeOrClass'
        }
      ]
    },
    {
      code: `
        function Contract(){}
        module.exports = Contract
      `,
      errors: [
        {
          messageId: 'needInit'
        }
      ]
    },
    {
      code: `
        function Contract(){}
        Contract.prototype = {}
        module.exports = Contract
      `,
      errors: [
        {
          messageId: 'needInit'
        }
      ]
    }
  ]
})
