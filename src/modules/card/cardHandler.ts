import { ServerHandler } from 'serverTypes'
import { Request, Response } from 'express'
import cardService from './cardService'
import errorHandler from 'utils/handlers/errorHandler'

export interface CardHandler extends ServerHandler {
  getCards: (req: Request, res: Response) => Promise<void>
}

const cardHandler: CardHandler = {
  async getCards (req, res) {
    const language: string = req.params.language

    const cards = await cardService.getCards(language)

    res.send(cards)
  }
}

export default errorHandler(cardHandler)
