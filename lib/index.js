/**
 * @fileoverview smart contract lint rules
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  parser: 'espree',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  environments: {
    nvm: {
      globals: {
        LocalContractStorage: true,
        Blockchain: true,
        Event: true,
        ContractStorage: true,
        BigNumber: true,
        NativeStorage: true,
        console: true,
        Math: true,
        Date: true,
        Uint: true
      }
    }
  },
  rules: requireIndex(__dirname + '/rules')
}
