
const { equal } = require('assert')
const request = require('supertest')
const cheerio = require('cheerio')
const Koa = require('koa')

const vueView = require('..')

describe('basic', () => {
  describe('bundle render', () => {
    const app = new Koa()

    app.use(vueView({
      layout: '../layout.html',
      root: 'example/simple/dist',
      cache: false,
      bundleOptions: {
        ext: 'server.json',
        cache: true
      }
    }))

    app.use(async ctx => {
      await ctx.render('main', {
        title: 'hello, vue ssr !',
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

      equal($('head > title').text().trim(), 'hello, vue ssr !')

      // equal($('main > section > div').first().text().trim(), '99')
      // equal($('main > section > div').last().text().trim(), '98')
      // equal($('footer').text().trim(), '97')
    })
  })
})
