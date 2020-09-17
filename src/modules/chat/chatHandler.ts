import { ServerHandler } from 'serverTypes'
import { Chat } from './chatModel'
import chatService from './chatService'
import errorHandler from 'utils/handlers/errorHandler'

export interface ChatHandler extends ServerHandler {
  getChats: () => Promise<Chat[]>
}

const chatHandler: ChatHandler = {
  async getChats () {
    return await chatService.getChats()
  }
}

export default errorHandler(chatHandler)
