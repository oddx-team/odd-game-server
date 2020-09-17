import { Db } from 'mongodb'
import { RedisPersistence } from 'persistence/redis'

declare global {
  module NodeJS {
    interface Global {
      mongoDB: Db
      redis: RedisPersistence
    }
  }
}
