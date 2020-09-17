import { RequestHandler } from 'express'

export type ServerHandler = Record<string, RequestHandler>
