import { Request, Response } from 'express'

export default function (req: Request, res: Response): void {
  res.redirect('https://oddgame.io')
}
