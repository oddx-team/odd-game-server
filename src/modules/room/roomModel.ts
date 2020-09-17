export const ROOM_COLLECTION = 'rooms'
export const ROOM_CHAT_COLLECTION = 'room_chats'

export interface Room {
  slug: string
  name: string
  host: string
  size: number
  current: number
  guest: number
  status: RoomStatus
  country: string
}

export enum RoomStatus {
  NOT_STARTED,
  PLAYING
}

export interface RoomChat {
  username: string
  message: string
  time: number
  slug: string
}
