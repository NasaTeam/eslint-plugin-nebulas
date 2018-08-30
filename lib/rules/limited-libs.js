/**
 * @fileoverview Report unsupported third-party library.*.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const supportedLibNames = ['crypto.js']

module.exports = {
  meta: {
    docs: {
      description: 'Report unsupported internal third-party library.'
    },
    messages: {
      unsupported: 'You are requiring an unsupported third-party library'
    }
  },

  create(context) {
    return {
      CallExpression(node) {
        if (!node.callee || node.callee.name !== 'require') {
          return
        }

        if (
          node.arguments &&
          node.arguments[0] &&
          !supportedLibNames.includes(node.arguments[0].value)
        ) {
          context.report({
            node: node.arguments[0],
            messageId: 'unsupported'
          })
        }
      }
    }
  }
}
