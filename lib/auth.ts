import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'

const TOKEN_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setAuthCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeAuthCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function getAuthCookie(req: NextApiRequest | IncomingMessage): string | undefined {
  const cookies = parse(req.headers.cookie || '')
  return cookies[TOKEN_NAME]
}

export function validateAdmin(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'changeme'
  
  return username === adminUser && password === adminPass
}

export function isAuthenticated(req: NextApiRequest | IncomingMessage): boolean {
  const token = getAuthCookie(req)
  return token === 'authenticated'
}
