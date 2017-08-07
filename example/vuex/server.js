
const serve = require('koa-static')
const Koa = require('koa')

const vueView = require('../../')

const app = new Koa()

app.use(serve('.'))

app.use(vueView({
  layout: 'layout.html',
  root: __dirname,
  cache: false,
  bundleOptions: {
    catch: true,
    ext: 'server.json'
  }
}))

app.use(async ctx => {
  if (ctx.path !== '/') {
    return
  }

  await ctx.render('dist/main', {
    title: 'hi, vue !',
    count: 97
  })
})

app.listen(3003)
console.info('port: 3003')
