import * as Koa from 'koa'

interface CtxInter extends Koa.Context {
  request: any,
  response: any
}

export type Ctx = CtxInter