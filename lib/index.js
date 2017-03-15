
'use strict'

const { resolve, basename, extname, join } = require('path')
const { readFileSync, readFile } = require('mz/fs')
const template = require('lodash.template')
const LRU = require('lru-cache')
const assert = require('assert')

const {
  createBundleRenderer,
  createRenderer
} = require('vue-server-renderer')

const {
  parseTemplate,
  parseScript
} = require('./parser')

global.Vue = require('vue')

module.exports = function vueView(opts = {}) {
  let {
    cache = true,
    layout,
    root
  } = opts

  assert.ok(typeof root === 'string', 'root is required')

  if (cache === true) {
    // default cache
    cache = LRU({
      max: 999
    })
  }

  const renderer = createRenderer({
    cache
  })

  root = resolve(root)
  // ext = ext.replace(/^\./, '')

  if (layout) {
    layout = readFileSync(resolve(root, layout), 'utf-8')
  }
  layout = template(layout || '${ content }')

  return async function vue(ctx, next) {
    if (ctx.render) {
      return await next()
    }

    ctx.renderBundle = createBundleRender(ctx, root, layout)

    ctx.render = async (view, data = {}) => {
      const filename = extname(view) ? view : (view + '.vue')
      const filepath = join(root, filename)
      // TODO - cache
      const text = await readFile(filepath, 'utf-8')

      const template = parseTemplate(text)
      const props = parseScript(text)

      const Com = Vue.component(realname(view), {
        template: template
      })

      // TODO - merge data
      const vm = new Com(Object.assign({}, props))

      const html = await render(vm)

      return ctx.body = layout({
        content: html
      })
    }

    return await next()
  }

  /**
   *
   */

  function render(component) {
    return new Promise((resolve, reject) => {
      renderer.renderToString(component, (error, html) => {
        if (error) {
          reject(error)
        } else {
          resolve(html)
        }
      })
    })
  }

}

/**
 * private
 */

function realname(filename) {
  const b = basename(filename)
  return b.replace(extname(b), '')
}

// TODO - cache
function createBundleRender(ctx, root, layout) {
  return async (filename) => {
    filename = extname(filename) ? filename : (filename + '.js')
    filename = resolve(root, filename)
    const text = await readFile(filename, 'utf-8')
    const r = createBundleRenderer(text)

    return new Promise((resolve, reject) => {
      r.renderToString({}, (err, html) => {
        if (err) {
          reject(err)
        } else {
          html = layout({
            content: html
          })

          ctx.body = html
          resolve(html)
        }
      })
    })
  }
}
