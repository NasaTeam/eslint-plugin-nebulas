/**
 * @fileoverview Report ESM import calls and export.*.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report ESM import calls and export.'
    },
    messages: {
      import: 'Expected "require()" instead of "import"',
      export: 'Expected "module.exports"'
    }
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        context.report({ node, messageId: 'import' })
      },

      ExportNamedDeclaration(node) {
        context.report({ node, messageId: 'export' })
      },

      ExportDefaultDeclaration(node) {
        context.report({ node, messageId: 'export' })
      }
    }
  }
}
