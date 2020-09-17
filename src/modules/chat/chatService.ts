import { Chat, CHAT_COLLECTION } from './chatModel'

export interface ChatService {
  getChats: () => Promise<Chat[]>
  insertChat: (chat: Chat) => Promise<void>
}

const chatService: ChatService = {
  async getChats () {
    return await global.mongoDB.collection(CHAT_COLLECTION)
      .find().limit(100).toArray() as Chat[]
  },
  async insertChat (chat) {
    await global.mongoDB.collection(CHAT_COLLECTION)
      .insertOne(chat)
  }
}

export default chatService
