import jwt from 'jsonwebtoken'
import { UserIdentify } from 'indentifyTypes'

export function createJWT (identify: UserIdentify): string {
  return jwt.sign(identify, 'secret', { expiresIn: '24h' })
}

export function verifyJWT (token: string): UserIdentify {
  return jwt.verify(token, 'secret') as UserIdentify
}
