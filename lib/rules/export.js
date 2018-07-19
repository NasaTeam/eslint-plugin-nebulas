/**
 * @fileoverview Ensure an export is present.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Ensure an export is present.',
    },
    messages: {
      needExport: 'need module.exports to expose smart contract object'
    }
  },

  create(context) {
    const exportNodeList = []

    return {
      MemberExpression(node) {
        // module.exports
        if (node.object.name === 'module' && node.property.name === 'exports') {
          exportNodeList.push(node)
        }
      },
      'Program:exit'(node) {
        if (!exportNodeList.length) {
          context.report({ node, messageId: 'needExport' })
        }
      }
    }
  }
}
