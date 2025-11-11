import type { NextApiRequest, NextApiResponse } from 'next'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { username, password } = req.body

  // Simple environment variable-based authentication
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASS || 'changeme123'

  if (username === adminUser && password === adminPass) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    session.isLoggedIn = true
    session.username = username
    await session.save()

    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ error: 'Invalid credentials' })
}
