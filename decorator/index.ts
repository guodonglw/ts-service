function beforeController(target: any, name: any, descriptor: any) {
  let oldValue = descriptor.value
  descriptor.value = function () {
    const ctx = arguments[0]
    ctx.log.info(`-----------------${name}-----------------`)
    ctx.log.info(ctx.request.body)
    ctx.type = 'application/json'
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

export default {
  beforeController
}