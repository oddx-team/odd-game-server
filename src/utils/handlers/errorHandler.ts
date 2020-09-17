import { Request, Response, NextFunction } from 'express'
import { ServerHandler } from 'serverTypes'

function errorHandler<T extends ServerHandler> (handlers: T): T {
  const errorHandlerFunc = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    const routePromise = fn(req, res, next)
    routePromise.catch((err: Error) => next(err))
  }

  const handlersArr = Object.keys(handlers).map(key => ({
    key,
    value: errorHandlerFunc(handlers[key])
  }))

  return handlersArr.reduce(
    (obj, item) => {
      obj[item.key] = item.value
      return obj
    },
    Object.create(null)
  )
}

export default errorHandler
