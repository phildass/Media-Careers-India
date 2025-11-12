import { serialize, parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingMessage } from 'http'

/**
 * Admin auth cookie helpers
 *
 * TOKEN_NAME: cookie name used across the app
 * setAuthCookie: serializes and sets a secure, httpOnly cookie
 * removeAuthCookie: expires the cookie
 * getAuthCookie: parses cookie header and returns token value
 *
 * Note: setAuthCookie uses secure: process.env.NODE_ENV === 'production'
 * so the cookie will be accepted in localhost/dev (secure=false) and be
 * secure in production (https).
 */

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
    expires: new Date(0),
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function getAuthCookie(req: NextApiRequest | IncomingMessage): string | undefined {
  const cookieHeader = (req.headers && (req.headers as any).cookie) || ''
  const cookies = parse(cookieHeader)
  return cookies[TOKEN_NAME]
}

export function validateAdmin(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'changeme'

  return username === adminUser && password === adminPass
}

/**
 * isAuthenticated
 * Current project convention checks for the literal token value 'authenticated'
 * (pages/api/auth/login.ts calls setAuthCookie(res, 'authenticated')).
 * Keep that behavior to remain compatible.
 * If you plan to use signed JWTs later, change this to verify the token properly.
 */
export function isAuthenticated(req: NextApiRequest | IncomingMessage): boolean {
  const token = getAuthCookie(req)
  return token === 'authenticated'
}
