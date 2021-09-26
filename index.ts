const koa = require('koa')
import MainRouter from './router/index'
import Middleware from './middleware/index'

const app = new koa()

new Middleware(app)
new MainRouter(app)

app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})