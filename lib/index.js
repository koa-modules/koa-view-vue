
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

const assign = Object.assign

module.exports = function vueView(opts = {}) {
  let {
    ext = 'vue',
    layout,
    cache,
    root
  } = opts

  assert.ok(typeof root === 'string', 'root is required')

  root = resolve(root)

  // bundle render options
  const bundleOptions = assign({}, {
    ext: '.json',
    cache: true,
    root
  }, opts.bundleOptions)

  bundleOptions.ext = bundleOptions.ext.replace(/^\./, '')
  ext = ext.replace(/^\./, '')

  bundleOptions.root = resolve(bundleOptions.root)

  if (layout) {
    layout = readFileSync(resolve(root, layout), 'utf-8')
  }
  layout = template(layout || '${ content }')

  const renderer = createRenderer({
    cache: cache ? LRU({
      max: 10000
    }) : false
  })

  return async function(ctx, next) {
    if (ctx.render) {
      return await next()
    }

    ctx.renderBundle = createBundleRender(bundleOptions, ctx, layout)

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

function createBundleRender(options, ctx, layout) {
  const {
    cache,
    root,
    ext
  } = options

  return async function bundleRender(filename, data) {
    filename = filename + '.' + ext
    filename = resolve(root, filename)
    const r = createBundleRenderer(filename, {
      cache: cache ? LRU({
        max: 10000
      }) : false
    })

    return new Promise((resolve, reject) => {
      r.renderToString({
        path: ctx.path,
        data
      }, (err, html) => {
        if (err) {
          reject(err)
        } else {
          html = layout(assign({}, data, {
            _vue_ssr_html_: html,
            _vue_ssr_data_: data
          }))

          ctx.body = html
          resolve(html)
        }
      })
    })
  }
}
