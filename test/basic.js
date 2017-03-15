
const { deepEqual, equal } = require('assert')
const request = require('supertest')
const Koa = require('koa')
const Vue = require('vue')

const vueView = require('..')

describe('basic', () => {
  describe('render component', () => {
    const app = new Koa()

    app.use(vueView({
      root: __dirname,
      cache: false
    }))

    app.use(async ctx => {
      await ctx.render('foo')
    })

    it('should OK', async () => {
      const res = await request(app.listen())
        .get('/')
        .expect(200)

      const expectHtml = `<div server-rendered="true"><h1>Hello, world !</h1> <input value="foo"> <h3 message="foo"></h3> <users items=""></users></div>`
      equal(res.text, expectHtml)
    })
  })

  describe('bundle render', () => {
    const app = new Koa()

    app.use(vueView({
      layout: '../layout.html',
      root: 'example/dist',
      cache: false
    }))

    app.use(async ctx => {
      ctx.body = await ctx.renderBundle('build.server.js')
    })

    it('should OK', async () => {
      const expectHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>vue server render bundle</title>
  </head>
  <body>
    <main server-rendered="true"><h1>hello</h1> <h2>world</h2> <h3>0</h3></main>
    <script src="/dist/build.js"></script>
  </body>
</html>
`
      const res = await request(app.listen())
        .get('/')
        .expect(200)

      equal(res.text, expectHtml)
    })
  })
})
