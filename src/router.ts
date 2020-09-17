import express from 'express'
import authenticationRouter from 'modules/authentication/authRouter'
import chatRouter from 'modules/chat/chatRouter'
import cardRouter from 'modules/card/cardRouter'
import roomRouter from 'modules/room/roomRouter'

const router = express.Router()

router.use('/authenticate', authenticationRouter)
router.use('/chat', chatRouter)
router.use('/cards', cardRouter)
router.use('/rooms', roomRouter)

export default router
