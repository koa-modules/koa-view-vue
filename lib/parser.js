
const requireFromString = require('require-from-string')
const { transform } = require('babel-core')
const balanced = require('balanced-match')

function parseTemplate(content) {
  // I don't use lang="pug" ... ((>_<))
  const text = balanced('<template>', '</template>', content)
  return text.body
}

function parseScript(content) {
  const options = {
    // TODO: use env
    presets: ['latest']
  }

  let script = balanced('<script>', '</script>', content).body

  if (!script) {
    return ''
  }

  script = transform(script, options).code

  const obj = requireFromString(script)

  // return parseData(obj.default)
  return obj.default
}

function parseData(object) {
  const result = {}

  for (let key of Object.keys(object)) {
    if (key === 'data') {
      result.data = () => object.data()
    } else {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 *
 */

module.exports = {
  parseTemplate,
  parseScript
}
