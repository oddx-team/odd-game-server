import express from 'express'
import cardHandler from './cardHandler'

const router = express.Router()

router.get('/', cardHandler.getCards)

export default router
