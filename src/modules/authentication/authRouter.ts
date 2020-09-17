import express from 'express'
import authHandler from './authHandler'
import jwtMiddleware from 'middlewares/jwtMiddleware'

const router = express.Router()

router.get('/me', jwtMiddleware, authHandler.getMyUsername)
router.post('/register', authHandler.registerUsername)
router.post('/logout', jwtMiddleware, authHandler.logout)

export default router
