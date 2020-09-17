import { ServerHandler } from 'serverTypes'
import { Request, Response } from 'express'
import roomService from './roomService'
import errorHandler from 'utils/handlers/errorHandler'

export interface RoomHandler extends ServerHandler {
  createRooms: (req: Request, res: Response) => Promise<void>
  getRooms: (req: Request, res: Response) => Promise<void>
  getRoom: (req: Request, res: Response) => Promise<void>
  getRoomChats: (req: Request, res: Response) => Promise<void>
}

interface Body {
  name: string
  size: number
}

const roomHandler: RoomHandler = {
  async createRooms (req, res) {
    const country: string = req.params.country
    const body: Body = req.body

    const result = await roomService.createRoom(country, req.username ?? 'unknown', body.name, body.size)
    res.send(result)
  },
  async getRooms (req, res) {
    const country: string = req.params.country

    const rooms = await roomService.getRooms(country)
    res.send(rooms)
  },
  async getRoom (req, res) {
    const slug: string = req.params.slug

    const room = await roomService.getRoom(slug)
    res.send(room)
  },
  async getRoomChats (req, res) {
    const slug: string = req.params.slug

    const chats = await roomService.getRoomChats(slug)
    res.send(chats)
  }
}

export default errorHandler(roomHandler)
