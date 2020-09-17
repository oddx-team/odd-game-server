import redis from 'redis'
import { promisify } from 'util'

export interface RedisPersistence {
  get: (key: string) => Promise<string | null>
  set: (key: string, value: string) => Promise<unknown>
  expire: (key: string, time: number) => Promise<number>
  del: (key: string) => Promise<number>
}

export function useRedis (): void {
  const client = redis.createClient()
  global.redis = {
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    expire: promisify(client.expire).bind(client),
    del: promisify(client.del).bind(client)
  }
}

export default useRedis
