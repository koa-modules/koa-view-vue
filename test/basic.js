
const { deepEqual, equal } = require('assert')
const request = require('supertest')
const cheerio = require('cheerio')
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
      ctx.body = await ctx.renderBundle('build.server.js', {
        fooCount: 99,
        barCount: 98,
        count: 97
      })
    })

    it('should OK', async () => {
      const res = await request(app.listen())
        .get('/ssr')
        .expect(200)

      const $ = cheerio.load(res.text)

      equal($('main > section > div').first().text().trim(), '99')
      equal($('main > section > div').last().text().trim(), '98')
      equal($('footer').text().trim(), '97')
    })
  })
})
