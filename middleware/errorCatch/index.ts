import {Ctx} from '../../interface'

class ErrorCatch {
  init () {
    return async (ctx: Ctx, next: any) => {
      try {
        await next();
      } catch (e: any) {
        ctx.type = 'application/json';
        ctx.body = {
          status: -1,
          message: e.message
        }
      }
    }
  }
}

export default ErrorCatch