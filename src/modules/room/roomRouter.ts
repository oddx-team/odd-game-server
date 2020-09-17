import express from 'express'
import roomHandler from './roomHandler'

const router = express.Router()

router.get('/:country', roomHandler.getRooms)
router.get('/:slug', roomHandler.getRoom)
router.post('/:country', roomHandler.createRooms)
router.get('/:slug/chat', roomHandler.getRoomChats)

export default router
