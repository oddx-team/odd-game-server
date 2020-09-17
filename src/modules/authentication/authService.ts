import { createJWT } from 'utils/jwt/jwt'

export interface AuthService {
  registerUsername: (username: string) => Promise<string>
  logout: (username: string) => Promise<void>
}

const authService: AuthService = {
  async registerUsername (username) {
    const usernameIsExist = await global.redis.get(username)

    if (usernameIsExist !== 'user') {
      await global.redis.set(username, 'user')
      await global.redis.expire(username, 60 * 60 * 24)
      return createJWT({ username })
    }

    throw new Error('Username is already picked')
  },
  async logout (username) {
    await global.redis.del(username)
  }
}

export default authService
