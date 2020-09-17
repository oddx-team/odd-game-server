import { Server, Socket } from 'socket.io'
import { Chat } from './chatModel'
import chatService from './chatService'

function chatSocket (io: Server, socket: Socket): void {
  socket.on('chat-global', (message) => {
    const newChat: Chat = {
      username: socket.username,
      message,
      time: new Date().getTime() / 1000
    }
    void chatService.insertChat(newChat)
    io.emit('chat-global', socket.username, message)
  })
}

export default chatSocket
