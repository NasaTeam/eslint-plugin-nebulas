/**
 * @fileoverview Ensure an export is a smart contract object.
 * @author newraina
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Ensure an export is a smart contract object.'
    },
    messages: {
      prototypeOrClass: 'A Contract must be a Constructor or Class',
      needInit: 'A Contract must include an init method'
    }
  },

  create(context) {
    /*
     * why contractContructorDefNode is a list?
     * every time found `xxx.prototype = { init(){} }` or `xxx.prototype.init = () => {}` pattern,
     * we get an contract contructor like node, but we don't know if it's the one which will be exported,
     * so, we push it to a list.
     */
    const contractContructorDefNodeList = []

    /*
     * store all Object def node which has `init` method definition
     */
    const hasInitFieldObjDefNodeList = []

    function getVariableNode(scope, identifierName) {
      const variables = scope.variables
      const matchedVar = variables.find(v => v.name === identifierName)
      if (!matchedVar) {
        if (!scope.childScopes.length) {
          return
        }

        return scope.childScopes
          .map(s => getVariableNode(s, identifierName))
          .find(v => v && v.name === identifierName)
      }
      return matchedVar
    }

    function getDefNode(identifierName) {
      const scope = context.getScope()
      const varNode = getVariableNode(scope, identifierName)
      return varNode && [...varNode.defs].pop()
    }

    return {
      MemberExpression(node) {
        // find all pattern like this: xx.init
        if (node.object.type === 'Identifier' && node.property.name === 'init') {
          hasInitFieldObjDefNodeList.push(getDefNode(node.object.name))
        }

        // xxx.prototype.init = () => {}
        if (
          node.property.name === 'init' &&
          node.object.type === 'MemberExpression' &&
          node.object.property.name === 'prototype'
        ) {
          contractContructorDefNodeList.push(getDefNode(node.object.object.name))
        }

        // xxx.prototype = xx
        if (node.property.name === 'prototype' && node.parent.type === 'AssignmentExpression') {
          const assignmentExpressionNode = node.parent
          // xxx.prototype = { init(){} }
          if (assignmentExpressionNode.right.type === 'ObjectExpression') {
            const objectExpressionNode = assignmentExpressionNode.right
            if (objectExpressionNode.properties.find(p => p.kind === 'init')) {
              contractContructorDefNodeList.push(getDefNode(node.object.name))
            }
          }
          // xxx.prototype = obj
          if (assignmentExpressionNode.right.type === 'Identifier') {
            const defNode = getDefNode(assignmentExpressionNode.right.name)

            // obj is not an Object
            if (
              defNode.node.type === 'VariableDeclarator' &&
              defNode.init &&
              defNode.init.type !== 'ObjectExpression'
            ) {
              return
            }

            const initPropertity = defNode.node.init.properties.find(p => p.key.name === 'init')
            const funcDefNode = getDefNode(node.object.name)
            const objDefNode = getDefNode(assignmentExpressionNode.right.name)

            // obj has an initial `init` propertity, and `init` is a method
            if (initPropertity && initPropertity.method) {
              contractContructorDefNodeList.push(funcDefNode)
              return
            }

            if (hasInitFieldObjDefNodeList.includes(objDefNode)) {
              contractContructorDefNodeList.push(funcDefNode)
            }
          }
        }

        // module.exports = xxx
        if (node.object.name === 'module' && node.property.name === 'exports') {
          const parent = node.parent
          if (
            parent &&
            parent.type === 'AssignmentExpression' &&
            parent.right.type === 'Identifier'
          ) {
            const identifierName = parent.right.name
            const defNode = getDefNode(identifierName)

            if (!defNode) {
              // the xxx identifier may be not defined
              return
            }

            if (
              defNode.type !== 'ClassName' &&
              defNode.type !== 'FunctionName' &&
              (defNode.type === 'Variable' &&
                (!defNode.node.init || defNode.node.init.type !== 'FunctionExpression'))
            ) {
              context.report({ node: defNode.name, messageId: 'prototypeOrClass' })
              return
            }

            if (defNode.type === 'ClassName') {
              const classBodyNodes = defNode.node.body.body
              const methodDefinitionNodes = classBodyNodes.filter(
                n => n.type === 'MethodDefinition'
              )
              if (!methodDefinitionNodes.find(n => n.key.name === 'init')) {
                context.report({ node: defNode.name, messageId: 'needInit' })
              }
            }

            if (defNode.type === 'FunctionName') {
              if (!contractContructorDefNodeList.includes(defNode)) {
                // the function has no prototype def, it's not a constructor
                context.report({ node: defNode.name, messageId: 'needInit' })
              }
            }
          }

          // xxx is Literal
          if (parent && parent.type === 'AssignmentExpression' && parent.right.type === 'Literal') {
            context.report({ node: parent.right, messageId: 'prototypeOrClass' })
          }
        }
      }
    }
  }
}
