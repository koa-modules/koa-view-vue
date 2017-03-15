
const { deepEqual, equal } = require('assert')
const { readFileSync } = require('fs')
const { join } = require('path')

const {
  parseTemplate,
  parseScript
} = require('../lib/parser')

const expectTmpl = `
  <div>
    <h1>{{ title }}</h1>
    <input v-model="message">
    <h3 :message="message"></h3>
    <users :items="items"></users>
  </div>
`

describe('## parser', () => {

  const text = readFileSync(join(__dirname, 'foo.vue'), 'utf-8')

  describe('# parseTemplate', () => {
    it('ok', () => {
      const tmpl = parseTemplate(text)
      equal(tmpl, expectTmpl)
    })
  })

  describe('# parseScript', () => {
    it('ok', () => {
      const result = parseScript(text)
      deepEqual(result.data(), {
        title: 'Hello, world !',
        message: 'foo',
        items: []
      })
    })
  })
})
