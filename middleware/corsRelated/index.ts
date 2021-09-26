const cors = require('koa2-cors');

class CorsRelated {
  init () {
    return cors({
      origin: () => {
        return "*"
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
  }
}

export default CorsRelated