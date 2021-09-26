const Home = require('../controller/home')

class HomeRouter {
  protected koaRouter: any
  protected router: any
  constructor(koaRouter: any, router: any) {
    this.koaRouter = new koaRouter({
      prefix: '/home'
    })
    this.router = router
    this.init()
  }

  protected init () {
    const home = new Home()
    this.koaRouter.get('/index', home.index)
    this.koaRouter.get('/login', home.login)

    this.router.use(this.koaRouter.routes())
  }
}

export default HomeRouter

