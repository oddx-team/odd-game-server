import SocketIO from 'socket.io'
import cookie from 'cookie'
import { verifyJWT } from 'utils/jwt/jwt'
import chatSocket from 'modules/chat/chatSocket'
import roomChatSocket from 'modules/room/roomSocket'

export function initWsServer (io: SocketIO.Server): void {
  io.use((socket, next): void => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie)
      socket.username = verifyJWT(cookies.token).username
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket) => {
    socket.on('ping', () => {
      socket.emit('pong')
    })

    chatSocket(io, socket)
    roomChatSocket(io, socket)

    socket.on('disconnect', () => {
      io.emit(`user ${socket.username} disconnected`)
    })
  })
}
