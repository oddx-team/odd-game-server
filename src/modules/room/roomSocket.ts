import { Server, Socket } from 'socket.io'
import { RoomChat } from './roomModel'
import roomService from './roomService'

function roomChatSocket (io: Server, socket: Socket): void {
  socket.on('join-room', ({ _, slug }) => {
    socket.join(slug)
    socket.roomSlug = slug
  })

  socket.on('leave-room', (roomName) => {
    socket.leave(roomName)
    socket.roomSlug = undefined
  })

  socket.on('chat-private', (message) => {
    if (socket.roomSlug === undefined) {
      return
    }

    const newChat: RoomChat = {
      username: socket.username,
      message,
      time: new Date().getTime() / 1000,
      slug: socket.roomSlug
    }
    void roomService.insertRoomChat(newChat)
    io.emit(socket.roomSlug, 'chat', socket.username, message)
  })
}

export default roomChatSocket
