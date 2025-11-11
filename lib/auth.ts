import { SessionOptions } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

export interface SessionData {
  isLoggedIn: boolean
  username?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_security',
  cookieName: 'mediacareers_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function checkAuth(req: NextApiRequest, res: NextApiResponse): Promise<boolean> {
  const { getIronSession } = await import('iron-session')
  const session = await getIronSession<SessionData>(req, res, sessionOptions)
  return session.isLoggedIn === true
}
