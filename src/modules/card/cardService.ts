import { Card, CARD_COLLECTION } from './cardModel'

export interface CardService {
  getCards: (language: string) => Promise<Card[]>
}

const cardService: CardService = {
  async getCards (language) {
    return await global.mongoDB.collection(CARD_COLLECTION)
      .find({ language }).sort({ $nature: -1 }).toArray() as Card[]
  }
}

export default cardService
