import http from 'http'
import express from 'express'
import router from './router'

import useMongoDB from 'persistence/mongodb'
import useRedis from 'persistence/redis'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import errorMiddleware from 'middlewares/errorMiddleware'
import defaultHandler from 'utils/handlers/defaultHandler'
import socketIO from 'socket.io'
import { initWsServer } from './socket'

async function main (): Promise<void> {
  // Init MongoDB
  const mongoDBUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/odd-game-db'
  try {
    await useMongoDB(mongoDBUri, 'default')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  // Init Redis
  useRedis()

  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = socketIO(httpServer)
  initWsServer(wsServer)
  wsServer.origins('*:*')

  const envPort: string | undefined = process.env.PORT
  const port: number = envPort === undefined ? 3000 : parseInt(envPort)

  app.use(cors())
  app.use(compression())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api', router)

  app.use(errorMiddleware)
  app.use(defaultHandler)

  httpServer.listen(port, () =>
    console.log(`Server started at port ${port}`))
}

void main()
