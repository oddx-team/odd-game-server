import express from 'express'
import chatHandler from './chatHandler'

const router = express.Router()

router.get('/', chatHandler.getChats)

export default router
