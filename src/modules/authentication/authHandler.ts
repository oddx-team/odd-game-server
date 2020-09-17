import { Request, Response } from 'express'
import { ServerHandler } from 'serverTypes.ts'
import errorHandler from 'utils/handlers/errorHandler'
import authService from './authService'

export interface AuthHandler extends ServerHandler {
  getMyUsername: (req: Request, res: Response) => void
  registerUsername: (req: Request, res: Response) => Promise<void>
  logout: (req: Request, res: Response) => Promise<void>
}

interface BodyWithUserName {
  username: string
}

const authHandler: AuthHandler = {
  getMyUsername (req: Request, res: Response) {
    res.send({
      username: req.username
    })
  },
  async registerUsername (req: Request, res: Response) {
    const body: BodyWithUserName = req.body

    const token = await authService.registerUsername(body.username)
    res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })
    res.send({
      token
    })
  },
  async logout (req: Request, res: Response) {
    const body: BodyWithUserName = req.body

    try {
      await authService.logout(body.username)
    } catch (err) {
      res.status(400).send({
        message: err
      })
    }

    res.send({
      success: true
    })
  }
}

export default errorHandler(authHandler)
