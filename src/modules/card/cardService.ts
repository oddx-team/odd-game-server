import { Card, CARD_COLLECTION } from './cardModel'

export interface CardService {
  getCards: (language: string) => Promise<Card[]>
  generateCards: (color: string, size: number) => Promise<Card[]>
}

const cardService: CardService = {
  async getCards (language) {
    return await global.mongoDB.collection(CARD_COLLECTION)
      .find({ language }).sort({ $nature: -1 }).toArray() as Card[]
  },
  async generateCards (color, size) {
    const cardCollection = global.mongoDB.collection(CARD_COLLECTION)
    return await cardCollection.aggregate([
      { $match: { color } },
      { $sample: { size } }
    ]).toArray() as Card[]
  }
}

export default cardService
