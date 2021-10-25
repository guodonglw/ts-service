const MySqlController = require('../controller/mysql.ts')

class MySqlRouter {
  protected koaRouter: any
  protected router: any
  constructor (koaRouter: any, router: any) {
    this.koaRouter = new koaRouter({
      prefix: '/mysql'
    })
    this.router = router
    this.init()
  }

  init () {
    const controller = new MySqlController()
    this.koaRouter.post('/create', controller.create)
    this.koaRouter.get('/get', controller.get)
    this.koaRouter.post('/update', controller.update)
    this.koaRouter.post('/delete', controller.delete)

    this.router.use(this.koaRouter.routes())
  }
}

export default MySqlRouter