import { Request, Response, NextFunction } from 'express'

export default function errorMiddleware (err: Error, req: Request, res: Response, _: NextFunction): void {
  const isDevelopment = process.env.ENVIRONMENT !== 'production'

  const errorResponse = {
    message: err?.message,
    stack: err?.stack
  }

  console.error(errorResponse)

  const hiddenError = {
    message: 'Unexpected error, please contact support'
  }

  res.status(400).send(isDevelopment ? errorResponse : hiddenError)
}
