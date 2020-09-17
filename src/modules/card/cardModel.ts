export const CARD_COLLECTION = 'cards'

export interface Card {
  _id?: string
  color: string
  language: string
  text: string
  gaps?: number
}
