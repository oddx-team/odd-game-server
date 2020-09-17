import { Request, Response, NextFunction } from 'express'

import { verifyJWT } from 'utils/jwt/jwt'

export default function jwtMiddleware (req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.cookies.token
    const identify = verifyJWT(token)
    req.username = identify.username
    next()
  } catch (err) {
    res.status(401)
    res.send({ message: 'Unauthorized', error: err })
  }
}
