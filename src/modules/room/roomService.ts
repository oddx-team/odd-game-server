import { Room, RoomStatus, RoomChat, ROOM_CHAT_COLLECTION, ROOM_COLLECTION } from 'modules/room/roomModel'
import { paramCase } from 'change-case'
import cardService from 'modules/card/cardService'

export interface RoomService {
  createRoom: (country: string, host: string, name: string, size: number) => Promise<{ _id: string, slug: string }>
  getRooms: (country: string) => Promise<Room[]>
  getRoom: (slug: string) => Promise<RoomResult>
  insertRoomChat: (chat: RoomChat) => Promise<void>
  getRoomChats: (slug: string) => Promise<RoomChat[]>
}

export interface RoomInfo {
  _id: string
  slug: string
  round: number
}

export interface RoomResult {
  roomInfo: RoomInfo
  collectionCards: Array<string | undefined>
  blackCard?: string
  playedCards: string[]
}

const roomService: RoomService = {
  async createRoom (country, host, name, size) {
    const slug: string = paramCase(name)

    const newRoom: Room = {
      slug,
      name,
      host,
      size,
      current: 0,
      guest: 0,
      status: RoomStatus.NOT_STARTED,
      country
    }

    const result = await global.mongoDB.collection(ROOM_COLLECTION).insertOne(newRoom)
    return {
      _id: result.insertedId,
      slug
    }
  },
  async getRooms (country) {
    return await global.mongoDB.collection(ROOM_COLLECTION)
      .find({ country }).toArray() as Room[]
  },
  async getRoom (slug) {
    const blackCard = await cardService.generateCards('black', 1)
    const whiteCards = await cardService.generateCards('white', 10)
    const blackCardId = blackCard.pop()?._id
    const collectionCardIds = whiteCards.map(card => card._id)

    return {
      roomInfo: {
        _id: 'id',
        slug,
        round: 0
      },
      collectionCards: collectionCardIds,
      blackCard: blackCardId,
      playedCards: []
    }
  },
  async insertRoomChat (chat) {
    await global.mongoDB.collection(ROOM_CHAT_COLLECTION).insertOne(chat)
  },
  async getRoomChats (slug: string) {
    return await global.mongoDB.collection(ROOM_CHAT_COLLECTION)
      .find({ slug }).sort({ $nature: -1 }).toArray() as RoomChat[]
  }
}

export default roomService
