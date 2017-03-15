
const serve = require('koa-static')
const Koa = require('koa')

const vueView = require('..')

const app = new Koa()

app.use(serve('.'))

app.use(vueView({
  root: __dirname,
  cache: false
}))

app.use(async ctx => {
  ctx.body = await ctx.renderBundle('dist/build.server.js')
})

app.listen(3003)
console.info('port: 3003')
